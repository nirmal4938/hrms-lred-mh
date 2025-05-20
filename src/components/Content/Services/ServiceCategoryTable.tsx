import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config/config';

interface ServiceCategoryData {
  _id: string;
  name: string;
  description: string;
  status: boolean;
}

const ServiceCategoryTable: React.FC = () => {
  const [data, setData] = useState<ServiceCategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);
  const token = localStorage.getItem('accessToken');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/service-categories`);
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch service categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: ServiceCategoryData) => {
    setEditingId(record._id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${config.apiUrl}/api/service-categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      message.success('Service category deleted successfully');
      fetchCategories();
    } catch (error) {
      message.error('Failed to delete service category');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        await axios.put(
          `${config.apiUrl}/api/service-categories/${editingId}`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Service category updated successfully');
      } else {
        await axios.post(
          `${config.apiUrl}/api/service-categories`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        message.success('Service category created successfully');
      }
      setModalVisible(false);
      fetchCategories();
    } catch (error) {
      message.error('Failed to save service category');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
      render: (_: any, record: ServiceCategoryData) => (
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
        <h2 className="text-2xl font-bold text-gray-800">Service Categories</h2>
        <Button 
          onClick={handleAdd} 
          className="bg-gray-900 text-white flex items-center"
          icon={<PlusOutlined />}
        >
          Add Category
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
        title={editingId ? "Edit Service Category" : "Add Service Category"}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input className="h-10" placeholder="Enter category name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter category description"
              className="resize-none" 
            />
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

export default ServiceCategoryTable;