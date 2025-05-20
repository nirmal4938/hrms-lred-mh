import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Switch, Upload, Image, Rate } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config/config';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';

interface TestimonialData {
  _id: string;
  name: string;
  position: string;
  testimonial: string;
  image: string;
  rating: number;
  status: boolean;
}

const TestimonialTable: React.FC = () => {
  const [data, setData] = useState<TestimonialData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/testimonials`);
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setImageUrl(undefined);
    setModalVisible(true);
  };

  const handleEdit = (record: TestimonialData) => {
    setEditingId(record._id);
    setImageUrl(record.image);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${config.apiUrl}/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Testimonial deleted successfully');
      fetchTestimonials();
    } catch (error) {
      message.error('Failed to delete testimonial');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('accessToken');
      
      if (editingId) {
        await axios.put(
          `${config.apiUrl}/api/testimonials/${editingId}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Testimonial updated successfully');
      } else {
        await axios.post(
          `${config.apiUrl}/api/testimonials`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Testimonial created successfully');
      }
      setModalVisible(false);
      fetchTestimonials();
    } catch (error) {
      message.error('Failed to save testimonial');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <Image src={image} alt="Testimonial" width={50} height={50} className="rounded-full object-cover" />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <Rate disabled defaultValue={rating} />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => <Switch checked={status} disabled />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TestimonialData) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </>
      ),
    },
  ];

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
        <Button 
          onClick={handleAdd} 
          type="default"
          icon={<PlusOutlined />}
          className="hover:bg-gray-500 bg-gray-900 text-white"
        >
          Add Testimonial
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        className="shadow-sm"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingId ? "Edit Testimonial" : "Add Testimonial"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input name!' }]}
            >
              <Input className="rounded-lg" />
            </Form.Item>

            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: 'Please input position!' }]}
            >
              <Input className="rounded-lg" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: 'Please select rating!' }]}
            >
              <Rate />
            </Form.Item>
          </div>

          <Form.Item
            name="testimonial"
            label="Testimonial"
            rules={[{ required: true, message: 'Please input testimonial!' }]}
          >
            <Input.TextArea rows={4} className="rounded-lg" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            rules={[{ required: true, message: 'Please upload image!' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={(file) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  setImageUrl(reader.result as string);
                  form.setFieldsValue({ image: reader.result });
                };
                return false;
              }}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
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

export default TestimonialTable;