import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

interface EthosData {
  _id: string;
  title: string;
  description: string;
  icon: string;
  status: boolean;
}

const EthosTable: React.FC = () => {
  const [data, setData] = useState<EthosData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const token = localStorage.getItem('accessToken');

  const fetchEthos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/ethos`);
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch ethos sections');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEthos();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setImagePreview('');
    setModalVisible(true);
  };

  const handleEdit = (record: EthosData) => {
    setEditingId(record._id);
    form.setFieldsValue(record);
    setImagePreview(record.icon);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${config.apiUrl}/api/ethos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Ethos section deleted successfully');
      fetchEthos();
    } catch (error) {
      message.error('Failed to delete ethos section');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (editingId) {
        await axios.put(
          `${config.apiUrl}/api/ethos/${editingId}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Ethos section updated successfully');
      } else {
        await axios.post(
          `${config.apiUrl}/api/ethos`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Ethos section created successfully');
      }
      setModalVisible(false);
      fetchEthos();
    } catch (error) {
      message.error('Failed to save ethos section');
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const uploadProps: UploadProps = {
    name: 'file',
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const base64Image = await convertToBase64(file as File);
        form.setFieldsValue({ icon: base64Image });
        setImagePreview(base64Image);
        message.success(`${(file as File).name} converted successfully`);
        onSuccess?.(base64Image);
      } catch (error) {
        message.error(`${(file as File).name} conversion failed.`);
        onError?.(error as any);
      }
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error('Image must be smaller than 5MB!');
        return false;
      }
      return true;
    },
    showUploadList: false
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Icon',
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: string) => (
        <img src={icon} alt="Icon" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <Switch checked={status} disabled />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: EthosData) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-6 gap-5">
      <div className="flex justify-between items-center w-full mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Our Ethos Management</h2>
        <Button 
          onClick={handleAdd} 
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
          icon={<PlusOutlined />}
        >
          Add Ethos Section
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        className="shadow-sm"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingId ? "Edit Ethos Section" : "Add Ethos Section"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={720}
        className="ethos-modal"
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input className="h-10" placeholder="Enter ethos title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter ethos description"
              className="resize-none" 
            />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
            rules={[{ required: true, message: 'Please upload icon!' }]}
          >
            <div className="space-y-4">
              <Upload {...uploadProps} className="upload-list-inline">
                <Button icon={<UploadOutlined />} className="h-10">Upload Icon</Button>
              </Upload>
              {imagePreview && (
                <div className="mt-4 relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="max-w-full h-auto max-h-[200px] rounded-lg object-cover"
                  />
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined />} 
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => {
                      setImagePreview('');
                      form.setFieldsValue({ icon: '' });
                    }}
                  />
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EthosTable;