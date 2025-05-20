import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, message, Card } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

interface StatisticsData {
  establishedYear: number;
  consultantsCount: number;
  companiesSupported: number;
  visasPerYear: number;
  status: boolean;
}

const StatisticsTable: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/api/statistics`);
      if (response.data.data) {
        form.setFieldsValue(response.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch statistics');
    }
  };

  const onFinish = async (values: StatisticsData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        `${config.apiUrl}/api/statistics`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success('Statistics updated successfully');
    } catch (error) {
      message.error('Failed to update statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistics Management</h2>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          establishedYear: 2010,
          consultantsCount: 400,
          companiesSupported: 35,
          visasPerYear: 500
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="establishedYear"
            label="Established Year"
            rules={[{ required: true, message: 'Please input the established year!' }]}
          >
            <InputNumber min={1900} max={2100} className="w-full" />
          </Form.Item>

          <Form.Item
            name="consultantsCount"
            label="Consultants & Employees"
            rules={[{ required: true, message: 'Please input the consultants count!' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            name="companiesSupported"
            label="Multinational Companies Supported"
            rules={[{ required: true, message: 'Please input the companies supported!' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item
            name="visasPerYear"
            label="Visas Provided Per Year"
            rules={[{ required: true, message: 'Please input the visas per year!' }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button className='bg-gray-900 text-white' type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default StatisticsTable;