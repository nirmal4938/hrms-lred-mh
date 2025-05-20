import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Switch, Select, Upload, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config/config';

interface ServiceData {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  features: {
    title: string;
    description: string;
    image: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  status: boolean;
}

const ServiceTable: React.FC = () => {
  const [data, setData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ value: string; label: string; }[]>([]);
  const token = localStorage.getItem('accessToken');

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/services`);
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/service-categories`);
      setCategories(response.data.map((cat: any) => ({
        value: cat._id,
        label: cat.name
      })));
    } catch (error) {
      message.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: ServiceData) => {
    setEditingId(record._id);
    form.setFieldsValue({
      ...record,
      category: record.category._id
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${config.apiUrl}/api/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      message.error('Failed to delete service');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await axios.put(
          `${config.apiUrl}/api/services/${editingId}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Service updated successfully');
      } else {
        await axios.post(
          `${config.apiUrl}/api/services`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Service created successfully');
      }
      setModalVisible(false);
      fetchServices();
    } catch (error) {
      console.error(error);
      message.error('Failed to save service');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: ['category', 'name'],
      key: 'category',
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
      render: (_: any, record: ServiceData) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
        </>
      ),
    },
  ];

  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');

  const handlePreview = (image: string, title: string) => {
    setPreviewImage(image);
    setPreviewTitle(title);
    setPreviewVisible(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Services</h2>
        <Button 
          onClick={handleAdd} 
          type="default"
          icon={<PlusOutlined />}
          className=" hover:bg-gray-500 bg-gray-900 text-white"
        >
          Add Service
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
        title={editingId ? "Edit Service" : "Add Service"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={800}
        className="service-modal"
      >
        <Form form={form} layout="vertical" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Service Title"
              rules={[{ required: true, message: 'Please input service title!' }]}
            >
              <Input className="rounded-lg" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select options={categories} className="rounded-lg" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea rows={4} className="rounded-lg" />
          </Form.Item>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <Form.List name="features">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.key} className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item
                          name={[field.name, 'title']}
                          rules={[{ required: true, message: 'Please input feature title!' }]}
                        >
                          <Input placeholder="Feature title" className="rounded-lg" />
                        </Form.Item>
                        
                        <Form.Item
                          name={[field.name, 'image']}
                          rules={[{ required: true, message: 'Please upload feature image!' }]}
                        >
                          <div className="flex items-center space-x-4">
                            <Upload
                              accept="image/*"
                              showUploadList={false}
                              beforeUpload={(file) => {
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                  const features = form.getFieldValue('features');
                                  features[field.name].image = reader.result;
                                  form.setFieldsValue({ features });
                                };
                                return false;
                              }}
                            >
                              <Button icon={<UploadOutlined />} className="rounded-lg">Upload</Button>
                            </Upload>
                            {form.getFieldValue(['features', field.name, 'image']) && (
                              <div className="flex items-center space-x-2">
                                <Image
                                  src={form.getFieldValue(['features', field.name, 'image'])}
                                  alt="Feature preview"
                                  width={60}
                                  height={60}
                                  className="rounded-lg object-cover"
                                  preview={false}
                                  onClick={() => handlePreview(
                                    form.getFieldValue(['features', field.name, 'image']),
                                    form.getFieldValue(['features', field.name, 'title']) || 'Feature Image'
                                  )}
                                />
                                <EyeOutlined 
                                  className="text-blue-600 cursor-pointer" 
                                  onClick={() => handlePreview(
                                    form.getFieldValue(['features', field.name, 'image']),
                                    form.getFieldValue(['features', field.name, 'title']) || 'Feature Image'
                                  )}
                                />
                              </div>
                            )}
                          </div>
                        </Form.Item>
                      </div>

                      <Form.Item
                        name={[field.name, 'description']}
                        rules={[{ required: true, message: 'Please input feature description!' }]}
                      >
                        <Input.TextArea 
                          placeholder="Feature description" 
                          className="rounded-lg mt-2"
                          rows={3}
                        />
                      </Form.Item>

                      <Button 
                        type="text" 
                        danger 
                        onClick={() => remove(field.name)}
                        className="mt-2"
                      >
                        Delete Feature
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    block 
                    icon={<PlusOutlined />}
                    className="rounded-lg"
                  >
                    Add Feature
                  </Button>
                </div>
              )}
            </Form.List>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-4">Process Steps</h3>
            <Form.List name="process">
              {(fields, { add, remove }) => (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.key} className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Form.Item 
                          name={[field.name, 'step']} 
                          rules={[{ required: true }]}
                          className="mb-0"
                          initialValue={index + 1}
                        >
                          <Input 
                            placeholder="Step number" 
                            type="number"
                            className="rounded-lg"
                            disabled
                            value={index + 1}
                          />
                        </Form.Item>
                        <Form.Item 
                          name={[field.name, 'title']} 
                          rules={[{ required: true }]}
                          className="mb-0"
                        >
                          <Input 
                            placeholder="Step title" 
                            className="rounded-lg"
                          />
                        </Form.Item>
                      </div>
                      <Form.Item 
                        name={[field.name, 'description']} 
                        rules={[{ required: true }]}
                        className="mt-4"
                      >
                        <Input.TextArea 
                          placeholder="Step description" 
                          className="rounded-lg"
                          rows={3}
                        />
                      </Form.Item>
                      <Button 
                        type="text" 
                        danger 
                        onClick={() => remove(field.name)}
                        className="mt-2"
                      >
                        Delete Step
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="dashed" 
                    onClick={() => {
                      const currentFields = form.getFieldValue('process') || [];
                      add({ step: currentFields.length + 1 });
                    }} 
                    block 
                    icon={<PlusOutlined />}
                    className="rounded-lg"
                  >
                    Add Process Step
                  </Button>
                </div>
              )}
            </Form.List>
          </div>

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default ServiceTable;