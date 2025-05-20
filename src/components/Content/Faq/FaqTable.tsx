import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Table, Button, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import EditViewFaqTable from "./EditViewFaqTable";
import { Modal } from "antd";
import config from '../../../config/config';

// Update the API_URL constant
const API_URL = `${config.apiUrl}/api/faqs`; // Backend API URL

export interface FAQType {
  key: React.Key;
  id: number;
  question: string;
  answer: string;
  category: string;
  status: boolean;
}

const FaqTable: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const [data, setData] = useState<FAQType[]>([]);
  const [filteredData, setFilteredData] = useState<FAQType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQType | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch FAQs from API
  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const formattedData = response.data.map((faq: any) => ({
        key: faq._id, // Use _id for key
        id: faq._id, 
        question: faq.question,
        answer: faq.answer,
        category: faq.category?.name || "Uncategorized", // Extract category name
        status: faq.status ?? false, // Ensure boolean status
      }));
      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      message.error("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchFAQs();
  }, []);

  // Search Function
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };

  // Delete FAQ
  const handleDelete = async (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this FAQ?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`${API_URL}/${id}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          message.success("FAQ deleted successfully!");
          fetchFAQs(); // Refresh the table after deletion
        } catch (error) {
          message.error("Failed to delete FAQ.");
        }
      },
    });
  };

  const handleEdit = async (record: FAQType) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${record.id}`);
      const fetchedData = response.data;
  
      setEditingFAQ({
        ...record,
        ...fetchedData,
        category: fetchedData.category?.name || "Uncategorized", // Ensure category name is set
      });
    } catch (error) {
      message.error("Failed to fetch FAQ details.");
    } finally {
      setLoading(false);
      setIsEdit(true);
      setIsModalVisible(true);
    }
  };
  
  

  // View FAQ
  const handleView = (record: FAQType) => {
    setEditingFAQ(record);
    setIsEdit(false);
    setIsModalVisible(true);
};

  // Save FAQ (Add or Update)
  const handleSaveFAQ = async (values: FAQType) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        message.error("Authentication token not found. Please login again.");
        return;
      }

      if (isEdit && editingFAQ?.id) {
        // Update existing FAQ using correct API URL
        await axios.put(`${API_URL}/${editingFAQ.id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success("FAQ updated successfully!");
      } else {
        // Create new FAQ
        await axios.post(`${API_URL}api/faq`, values, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        message.success("FAQ added successfully!");
      }
      setIsModalVisible(false);
      fetchFAQs(); // Refresh the table
    } catch (error) {
      message.error("Failed to save FAQ.");
    }
  };
  
  

  // Cancel Modal
  const handleCancelModal = () => {
    setIsModalVisible(false);
    setEditingFAQ(null);
  };

  // Navigate to Add FAQ
  const handleAddFAQClick = () => {
    navigate("/addfaq");
  };

  // Define Table Columns
  const columns: ColumnsType<FAQType> = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      sorter: (a, b) => a.question.localeCompare(b.question),
      width: 200,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      sorter: (a, b) => a.answer.localeCompare(b.answer),
      width: 300,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <div className={`w-10 h-6 rounded-full bg-gray-300 ${status ? "bg-green-500" : ""} cursor-pointer`}>
          <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${status ? "translate-x-full" : ""}`}></div>
        </div>
      ),
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button 
        type="link" 
        icon={<DeleteOutlined />} 
        onClick={() => handleDelete(record.id)} 
        danger
      />
        </div>
      ),
      width: 240,
    },
  ];

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
        <div className="flex justify-between items-center w-full">
          <Input.Search placeholder="Search" onChange={handleSearchChange} style={{ width: 200 }} />
          <div className="flex gap-2 items-center">
            <Button onClick={handleAddFAQClick} className="!bg-gray-900 !text-white hover:!bg-gray-800 font-semibold h-10 px-4 rounded flex items-center">
              <PlusOutlined />
              Add new FAQ
            </Button>
          </div>
        </div>
        <div>
          <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} loading={loading} />
        </div>
      </div>

      {/* Edit / View FAQ Modal */}
      <EditViewFaqTable
        visible={isModalVisible}
        onCancel={handleCancelModal}
        onSave={handleSaveFAQ}
        faq={editingFAQ}
        isEdit={isEdit}
      />
    </>
  );
};

export default FaqTable;
