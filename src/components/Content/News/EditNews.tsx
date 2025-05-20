import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Select, DatePicker, Button, message, Space, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import axios from "axios";
import config from "../../../config/config";
import moment from "moment";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

interface NewsFormData {
  title: string;
  content: string;
  type: 'news' | 'event';
  status: 'draft' | 'published';
  eventDate?: string;
  eventLocation?: string;
  tags: string[];
}

const EditNews: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<NewsFormData>>({
    tags: [] // Initialize tags as empty array
  });

  useEffect(() => {
    fetchNewsDetails();
  }, [id]);



  const fetchNewsDetails = async () => {
    try {
    
      const response = await axios.get(`${config.apiUrl}/api/news/${id}`);
      const newsData = response.data;
      const formattedData = {
        ...newsData,
        eventDate: newsData.eventDate ? moment(newsData.eventDate) : undefined,
      };
      setInitialValues(formattedData);
      form.setFieldsValue(formattedData);
    } catch (error) {
      message.error("Failed to fetch news details");
    }
  };

  const onFinish = async (values: NewsFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(`${config.apiUrl}/api/news/${id}`, {
        ...values,
        eventDate: values.eventDate ? moment(values.eventDate).format() : undefined,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      message.success("News updated successfully");
      navigate("/news");
    } catch (error) {
      message.error("Failed to update news");
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="p-6">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/news")}
        className="mb-4"
      >
        Back to News List
      </Button>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Edit News/Event</h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: "Please select type" }]}
          >
            <Select>
              <Option value="news">News</Option>
              <Option value="event">Event</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) =>
              getFieldValue("type") === "event" ? (
                <>
                  <Form.Item
                    name="eventDate"
                    label="Event Date"
                    rules={[{ required: true, message: "Please select event date" }]}
                  >
                    <DatePicker className="w-full" />
                  </Form.Item>

                  <Form.Item
                    name="eventLocation"
                    label="Event Location"
                    rules={[{ required: true, message: "Please enter event location" }]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>

          <Form.Item 
            name="content"
            label="Content"
            rules={[{ required: true, message: "Please enter content" }]}
          >
            <ReactQuill 
              theme="snow"
              modules={modules}
              style={{ height: '300px', marginBottom: '50px' }}
            />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
          >
            <Select mode="tags" placeholder="Add tags">
              {(initialValues.tags || []).map(tag => (  // Add null check here
                <Option key={tag} value={tag}>{tag}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update
              </Button>
              <Button onClick={() => navigate("/news")}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditNews;