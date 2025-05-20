import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config/config';

interface Feature {
  title: string;
  description: string;
}

interface WhyChooseUsData {
  title: string;
  description: string;
  features: Feature[];
  status: boolean;
}

const WhyChooseUsTable: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/why-choose-us`);
      if (response.data.data) {
        form.setFieldsValue(response.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  const onFinish = async (values: WhyChooseUsData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${config.apiUrl}/api/why-choose-us`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Why Choose Us section updated successfully');
    } catch (error) {
      message.error('Failed to update Why Choose Us section');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us Section</h2>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ features: [] }}
      >
        <Form.Item
          name="title"
          label="Main Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Main Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.List name="features">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} className="mb-4">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      label="Feature Title"
                      rules={[{ required: true, message: 'Missing feature title' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label="Feature Description"
                      rules={[{ required: true, message: 'Missing feature description' }]}
                    >
                      <Input.TextArea rows={2} />
                    </Form.Item>
            
                    <Button type="text" danger onClick={() => remove(name)} icon={<MinusCircleOutlined />}>
                      Remove Feature
                    </Button>
                  </Space>
                </Card>
              ))}
              <Form.Item>
                <Button className='' type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Feature
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button className='bg-gray-900 text-white' type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WhyChooseUsTable;