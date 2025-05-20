import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Tag, Button, Spin, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../../config/config";

interface NewsData {
  title: string;
  content: string;
  image: string;
  date: string;
  type: 'news' | 'event';
  status: 'draft' | 'published';
  author: {
    _id: string;
    name: string;
    email: string;
  };
  slug: string;
  eventDate?: string;
  eventLocation?: string;
  tags: string[];
}

const ViewNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsDetails();
  }, [id]);

  const fetchNewsDetails = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/news/${id}`);
      setNews(response.data);
    } catch (error) {
      message.error("Failed to fetch news details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center min-h-screen" />;
  }

  if (!news) {
    return <div>News not found</div>;
  }

  return (
    <div className="p-6">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate("/news")}
        className="mb-4"
      >
        Back to News List
      </Button>
      
      <Card className="shadow-md">
        <Descriptions title={news.title} bordered column={2}>
          <Descriptions.Item label="Type">
            <Tag color={news.type === 'event' ? 'blue' : 'green'}>
              {news.type.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={news.status === 'published' ? 'green' : 'orange'}>
              {news.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Date">{news.date}</Descriptions.Item>
          <Descriptions.Item label="Author">{news.author?.name || 'Unknown'}</Descriptions.Item>
          {news.type === 'event' && (
            <>
              <Descriptions.Item label="Event Date">{news.eventDate}</Descriptions.Item>
              <Descriptions.Item label="Location">{news.eventLocation}</Descriptions.Item>
            </>
          )}
          <Descriptions.Item label="Tags" span={2}>
            {news.tags?.map(tag => (
              <Tag key={tag} className="mr-2">{tag}</Tag>
            ))}
          </Descriptions.Item>
          <Descriptions.Item label="Content" span={2}>
  <div
    className="whitespace-pre-wrap"
    dangerouslySetInnerHTML={{ __html: news.content }}
  />
</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ViewNews;