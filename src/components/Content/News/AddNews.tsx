import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import config from '../../../config/config';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

const AddNews = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${config.apiUrl}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error('Failed to create news');
      }

      navigate('/newslist');
    } catch (error) {
      console.error('Error creating news:', error);
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
    <div className="h-auto w-full">
      <div className="px-4 pt-4">
        <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
          <button
            className="flex items-center text-blue-500 hover:text-blue-700 font-semibold"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <div className="text-2xl font-bold">Add News</div>
          
          <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-4">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Enter news title" />
              </Form.Item>

              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: 'Please enter content' }]}
              >
                <ReactQuill 
                  theme="snow"
                  modules={modules}
                  style={{ height: '300px', marginBottom: '50px' }}
                  placeholder="Enter news content"
                />
              </Form.Item>

              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: 'Please select type' }]}
              >
                <Select placeholder="Select type">
                  <Option value="news">News</Option>
                  <Option value="event">Event</Option>
                </Select>
              </Form.Item>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
              >
                {({ getFieldValue }) =>
                  getFieldValue('type') === 'event' ? (
                    <>
                      <Form.Item
                        name="eventDate"
                        label="Event Date"
                        rules={[{ required: true, message: 'Please select event date' }]}
                      >
                        <DatePicker className="w-full" />
                      </Form.Item>

                      <Form.Item
                        name="eventLocation"
                        label="Event Location"
                        rules={[{ required: true, message: 'Please enter event location' }]}
                      >
                        <Input placeholder="Enter event location" />
                      </Form.Item>
                    </>
                  ) : null
                }
              </Form.Item>

              <div className="flex justify-end gap-3 mt-4">
                <Button onClick={() => navigate('/news')}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNews;