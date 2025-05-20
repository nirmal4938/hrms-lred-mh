import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Table, Button, Tag, message } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";

interface NewsDataType {
  key: string;
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  type: 'news' | 'event';
  status: 'draft' | 'published';
  author: string;
  slug: string;
  eventDate?: string;
  eventLocation?: string;
  tags: string[];
}

const NewsTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<NewsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<NewsDataType[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/api/news`);
      const newsData = response.data.map((item: any) => ({
        key: item._id,
        id: item._id,
        title: item.title,
        content: item.content,
        image: item.image,
        date: new Date(item.date).toLocaleDateString(),
        type: item.type,
        status: item.status,
        author: item.author?.name || 'Unknown',
        slug: item.slug,
        eventDate: item.eventDate ? new Date(item.eventDate).toLocaleDateString() : undefined,
        eventLocation: item.eventLocation,
        tags: item.tags || []
      }));
      setData(newsData);
      setFilteredData(newsData);
    } catch (error) {
      message.error("Failed to fetch news");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${config.apiUrl}/api/news/${id}`);
      message.success("News deleted successfully");
      fetchNews();
    } catch (error) {
      message.error("Failed to delete news");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };

  const columns: ColumnsType<NewsDataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === 'event' ? 'blue' : 'green'}>{type.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === 'published' ? 'green' : 'orange'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => navigate(`/news/view/${record.id}`)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => navigate(`/news/edit/${record.id}`)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
      <div className="flex justify-between items-center w-full">
        <Input.Search placeholder="Search" onChange={handleSearchChange} style={{ width: 200 }} />
        <Button
          onClick={() => navigate("/news/add")}
          className="!bg-gray-900 !text-white hover:!bg-gray-800 font-semibold h-10 px-4 rounded flex items-center"
        >
          <PlusOutlined /> Add News/Event
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default NewsTable;