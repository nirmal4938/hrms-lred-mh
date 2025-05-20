import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Table, Dropdown, Menu, Button, Tag, Checkbox, message } from "antd";
import {
  PlusOutlined,
  DownOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import ViewEditBlogModal from "./ViewEditBlogModal";
import config from "../../../config/config";


export interface BlogDataType {
  key: string;
  id: string;
  blogName: string;
  category: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  published: boolean;
}


const BlogTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<BlogDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<BlogDataType[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "blogName",
    "category",
    "createdBy",
    "createdOn",
    "updatedBy",
    "updatedOn",
    "published",
    "actions",
  ]);


  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [viewEditModalVisible, setViewEditModalVisible] = useState<boolean>(false);
  const [modalEditable, setModalEditable] = useState<boolean>(false);
  const [modalData, setModalData] = useState<BlogDataType | null>(null);


  // 📌 Fetch Blogs from API
  useEffect(() => {
    fetchBlogs();
  }, []);


  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/blog`);
      const blogs = response.data.map((blog: any) => ({
        key: blog._id, // Map `_id` to `key`
        id: blog._id, // Map `_id` to `id`
        blogName: blog.title, // Map `title` to `blogName`
        category: blog.category?.name || "Uncategorized", // Map `category.name` to `category`
        createdBy: blog.createdBy || "Unknown",
        createdOn: new Date(blog.createdAt).toLocaleDateString(),
        updatedBy: blog.updatedBy || "Unknown",
        updatedOn: new Date(blog.updatedAt).toLocaleDateString(),
        published: blog.status === "published", // Convert "status" to boolean
      }));
      setData(blogs);
      setFilteredData(blogs);
    } catch (error) {
      message.error("Failed to fetch blogs.");
    }
    setLoading(false);
  };
 
  // 📌 Search Filter
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };


  // 📌 Delete Blog
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${config.apiUrl}api/blog/${id}`);
      message.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      message.error("Failed to delete blog.");
    }
  };


  // 📌 Toggle Publish Status
  const handleTogglePublish = async (record: BlogDataType) => {
    try {
      const newStatus = record.published ? "draft" : "published"; // Convert boolean to status string
 
      await axios.patch(`${config.apiUrl}api/blogs/${record.id}/publish`, {
        status: newStatus,
      });
 
      setData((prevData) =>
        prevData.map((item) =>
          item.id === record.id ? { ...item, published: newStatus === "published" } : item
        )
      );
      setFilteredData((prevData) =>
        prevData.map((item) =>
          item.id === record.id ? { ...item, published: newStatus === "published" } : item
        )
      );
      message.success(`Blog status updated to ${newStatus}`);
    } catch (error) {
      message.error("Failed to update publish status.");
    }
  };
 


  // 📌 Open View/Edit Modal
  const handleViewEditModalOpen = (record: BlogDataType, editable: boolean) => {
    setModalData(record);
    setModalEditable(editable);
    setViewEditModalVisible(true);
  };
  const handleViewEdit = (record: BlogDataType, editable: boolean) => {
    console.log(record);
    // setModalData(record);
    // setModalEditable(editable);
    // setViewEditModalVisible(true);
    navigate('/addblog/edit/' + record.id);
  };
  // 📌 Close Modal
  const handleViewEditModalClose = () => {
    setViewEditModalVisible(false);
    setModalData(null);
  };


  // 📌 Handle Column Visibility
  const handleColumnChange = (key: string) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(key) ? prevColumns.filter((col) => col !== key) : [...prevColumns, key]
    );
  };


  // 📌 Table Columns
  const columns: ColumnsType<BlogDataType> = [
    {
      title: "Blog Name",
      dataIndex: "blogName",
      key: "blogName",
      sorter: (a, b) => a.blogName.localeCompare(b.blogName),
    },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   sorter: (a, b) => a.category.localeCompare(b.category),
    //   render: (text: string) => <Tag>{text}</Tag>,
    // },
    // {
    //   title: "Created By",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    // },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
    },
    // {
    //   title: "Updated By",
    //   dataIndex: "updatedBy",
    //   key: "updatedBy",
    // },
    {
      title: "Updated On",
      dataIndex: "updatedOn",
      key: "updatedOn",
    },
    // {
    //   title: "Published",
    //   dataIndex: "published",
    //   key: "published",
    //   render: (published: boolean, record: BlogDataType) => (
    //     <Checkbox className="text-green-600" checked={published} onChange={() => handleTogglePublish(record)} />
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" className="text-red-900" icon={<EyeOutlined />} onClick={() => handleViewEditModalOpen(record, false)} />
          <Button type="link" className="text-red-900" icon={<EditOutlined />} onClick={() => handleViewEdit(record, true)} />
          <Button type="link" className="text-red-900" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];


  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Input.Search placeholder="Search" onChange={handleSearchChange} style={{ width: 200 }} />
        {/* <Button onClick={fetchBlogs} icon={<ReloadOutlined />}>
          Refresh
        </Button> */}
        <Button  className="!bg-gray-900 !text-white hover:!bg-gray-800" onClick={() => navigate("/addblog")} type="primary" icon={<PlusOutlined />}>
          Add Blog
        </Button>
      </div>


      <Table
        columns={columns.filter((col) => visibleColumns.includes(col.key as string))}
        dataSource={filteredData}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        loading={loading}
        rowKey="id"
      />


      {viewEditModalVisible && modalData && (
     
        <ViewEditBlogModal
          visible={viewEditModalVisible}
          onClose={handleViewEditModalClose}
          blogData={modalData}
          onSave={fetchBlogs}  // Ensure the blog list updates after saving
          editable={modalEditable} // Pass the correct editable state
        />
      )}
     
    </>
  );
};


export default BlogTable;


