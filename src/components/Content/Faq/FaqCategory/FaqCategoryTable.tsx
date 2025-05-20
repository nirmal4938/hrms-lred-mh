import React, { useState, useEffect } from "react";
import { Input, Table, Button, Switch, Modal, Form, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { ColumnsType } from "antd/es/table";
import config from '../../../../config/config';

export interface CategoryDataType {
  key: React.Key;
  description: string; // Add this line
  category: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  status: boolean;
}

const FaqCategoryTable: React.FC = () => {
  const [data, setData] = useState<CategoryDataType[]>([]);
  const [filteredData, setFilteredData] = useState<CategoryDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleAddSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('accessToken');
      
      await axios.post(
        `${config.apiUrl}/api/faq-categories`,
        {
          name: values.name,
          description: values.description,
          status: values.status || false
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      message.success('Category added successfully');
      setIsAddModalVisible(false);
      form.resetFields();
      fetchCategories(); // Refresh the table
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Failed to add category');
      } else {
        message.error('An unexpected error occurred');
      }
      console.error("Error adding category:", error);
    }
  };

  // Update the axios calls
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/faq-categories`);
      const categories = response.data.map((item: any) => ({
        key: item._id,
        category: item.name,
        description: item.description, // Add this line
        createdBy: item.createdBy || "Unknown",
        createdOn: moment(item.createdAt).format("YYYY-MM-DD"),
        updatedBy: item.updatedBy || "Unknown",
        updatedOn: moment(item.updatedAt).format("YYYY-MM-DD"),
        status: item.status === "active",
      }));
      setData(categories);
      setFilteredData(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: React.Key) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${config.apiUrl}/api/faq-categories/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      message.success('Category deleted successfully');
      fetchCategories(); // Refresh the table
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Failed to delete category');
      } else {
        message.error('An unexpected error occurred');
      }
      console.error("Error deleting category:", error);
    }
  };

  const handleEdit = (record: CategoryDataType) => {
    setSelectedCategory(record);
    form.setFieldsValue({
      name: record.category,
      description: record.description // Add this line
    });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('accessToken');
      
      await axios.put(
        `${config.apiUrl}/api/faq-categories/${selectedCategory?.key}`,
        {
          name: values.name,
          description: values.description, // Add this line
          status: values.status || false
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      message.success('Category updated successfully');
      setIsEditModalVisible(false);
      form.resetFields();
      fetchCategories();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Failed to update category');
      } else {
        message.error('An unexpected error occurred');
      }
      console.error("Error updating category:", error);
    }
  };

  const columns: ColumnsType<CategoryDataType> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    {
      title: "Updated On",
      dataIndex: "updatedOn",
      key: "updatedOn",
    },
  
    {
      title: "Actions",
      key: "actions",
      render: (_, record: CategoryDataType) => (
        <div className="flex gap-2">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
          />
          <Button 
            type="link" 
            icon={<DeleteOutlined />} 
            onClick={() => {
              Modal.confirm({
                title: 'Delete Category',
                content: 'Are you sure you want to delete this category?',
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',
                onOk: () => handleDelete(record.key)
              });
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
      <div className="flex justify-between items-center w-full">
        <Input.Search placeholder="Search" onChange={() => {}} style={{ width: 200 }} />
        <div>
          <Button className=" bg-gray-900 !text-white hover:!bg-gray-800" type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>Add Category</Button>
          <Button onClick={fetchCategories} icon={<ReloadOutlined />} style={{ marginLeft: 10 }} />
        </div>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys),
        }}
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      {/* Add Modal */}
      <Modal
        title="Add Category"
        open={isAddModalVisible}
        onOk={handleAddSubmit}
        onCancel={() => setIsAddModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Category" rules={[{ required: true, message: "Please enter category" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: "Please enter description" }]}>
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Category"
        open={isEditModalVisible}
        onOk={handleEditSubmit}
        onCancel={() => {
          setIsEditModalVisible(false);
          form.resetFields();
        }}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="name" 
            label="Category" 
            rules={[{ required: true, message: "Please enter category name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="description" 
            label="Description" 
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input type="text" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FaqCategoryTable;


