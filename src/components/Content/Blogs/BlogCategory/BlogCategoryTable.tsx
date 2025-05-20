import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table, Button, Modal, Switch, Form, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import EditCategoryModal from "./EditCategoryModal";
import config from "../../../../config/config";

const BASE_URL = config.apiUrl // Replace with actual base URL

export interface CategoryDataType {
  key: string;
  id: number;
  category: string;
  count: number;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  status: boolean;
}

const BlogCategoryTable: React.FC = () => {
  const [data, setData] = useState<CategoryDataType[]>([]);
  const [filteredData, setFilteredData] = useState<CategoryDataType[]>([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState<CategoryDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // State for selected checkboxes

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/blog-category`);
      const categories = response.data.map((item: any) => ({
        key: item._id, // Use `_id` from API as the key
        id: item._id, // Ensure `id` is correctly mapped
        category: item.name, // Map `name` to `category`
        count: 0, // Since count is missing in API, default it to 0
        createdBy: "Admin", // Placeholder (modify if needed)
        createdOn: new Date().toLocaleDateString(), // Placeholder for created date
        updatedBy: "Admin", // Placeholder
        updatedOn: new Date().toLocaleDateString(), // Placeholder
        status: true, // Default status
      }));
      setData(categories);
      setFilteredData(categories);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
    setLoading(false);
  };
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((item) => item.category.toLowerCase().includes(value));
    setFilteredData(filtered);
  };

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
  
      // if (!token) {
      //   message.error("User is not authenticated! Please log in.");
      //   return;
      // }
  
      console.log("Token:", token); // Debugging step
  
      await axios.delete(`${BASE_URL}/api/blog-category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
      setFilteredData(newData);
      message.success("Category deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || "Failed to delete category");
      } else {
        message.error("An unexpected error occurred!");
      }
    }
  };
  

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      message.error("Category name cannot be empty!");
      return;
    }
  
    try {
      const token = localStorage.getItem('accessToken');
      
      
      const response = await axios.post(`${BASE_URL}/api/blog-category`, {
        name: newCategory,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    
      // Update the table data after successful creation
      const newEntry = {
        key: response.data._id,
        id: response.data._id,
        category: response.data.name,
        count: 0,
        createdBy: "Admin",
        createdOn: new Date().toLocaleDateString(),
        updatedBy: "Admin",
        updatedOn: new Date().toLocaleDateString(),
        status: true,
      };
  
      setData([...data, newEntry]);
      setFilteredData([...data, newEntry]);
      message.success("Category added successfully!");
  
      setNewCategory(""); // Clear input
      setIsAddModalVisible(false); // Close modal
    } catch (error) {
      message.error("Failed to add category!");
    }
  };
  
  const handleStatusChange = async (id: number, status: boolean) => {
    try {
      await axios.put(`${BASE_URL}/api/blog-category/${id}/status`, { status });
      const updatedData = data.map((item) => (item.id === id ? { ...item, status } : item));
      setData(updatedData);
      setFilteredData(updatedData);
      message.success("Status updated successfully");
    } catch (error) {
      message.error("Failed to update status");
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  const columns: ColumnsType<CategoryDataType> = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
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
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
    {
      title: "Updated On",
      dataIndex: "updatedOn",
      key: "updatedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch checked={status} onChange={(checked) => handleStatusChange(record.id, checked)} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => {
              setEditCategory(record);
              setIsEditModalVisible(true); // Add this line to open the modal
            }} 
          />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
        <div className="flex justify-between items-center w-full">
          <Input.Search placeholder="Search" onChange={handleSearchChange} style={{ width: 200 }} />
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddModalVisible(true)}
              className="!bg-gray-900 !text-white hover:!bg-gray-800 font-semibold h-10 px-4 rounded flex items-center"
            >
              <PlusOutlined /> Add Blog Category
            </Button>
            <ReloadOutlined className="text-gray-500" onClick={fetchCategories} />
          </div>
        </div>
        <Table
          rowSelection={rowSelection} // Enables checkboxes
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 5 }}
          loading={loading}
        />
      </div>

      {/* Edit Modal */}
      <EditCategoryModal
        isVisible={isEditModalVisible}
        categoryData={editCategory}
        onCancel={() => setIsEditModalVisible(false)}
        onSave={(updatedCategory) => {
          setIsEditModalVisible(false);
          setData((prev) => prev.map((item) => (item.id === updatedCategory.id ? updatedCategory : item)));
        }}
      />

      {/* Add Modal */}
    {/* Add Modal */}
<Modal
  title="Add Category"
  open={isAddModalVisible}
  onOk={handleAddCategory} // Call API on submit
  onCancel={() => setIsAddModalVisible(false)}
  okText="Submit"
  cancelText="Cancel"
>
  <Form>
    <Form.Item 
      label="Category" 
      name="category" 
      rules={[{ required: true, message: "Please input the category!" }]}
    >
      <Input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
    </Form.Item>
  </Form>
</Modal>

    </>
  );
};

export default BlogCategoryTable;
