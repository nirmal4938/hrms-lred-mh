import React, { useState } from 'react';
import { Form, Input, Select, Button, message, AutoComplete } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config/config';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { City, State, Country } from 'country-state-city';

const { Option } = Select;

interface JobFormData {
  title: string;
  city: string;
  state: string;
  country: string;
  jobtype: string;
  joblevel: string;
  NumberOfPost: number;
  category: string;
  skills: string[];
  description: string;
}

interface CityOption {
  value: string;
  label: string;
  stateCode: string;
  countryCode: string;
}

const JobPostingForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [autocompleteCities, setAutocompleteCities] = useState<CityOption[]>([]);

  React.useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${config.apiUrl}/api/job/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      form.setFieldsValue(response.data.data);
    } catch (error) {
      message.error('Failed to fetch job details');
    }
  };

  const handleCitySearch = (value: string) => {
    if (value.length < 2) return;

    const allCities = City.getCitiesOfCountry('IN')?.filter(city =>
      city.name.toLowerCase().includes(value.toLowerCase())
    ) || [];

    const options = allCities.map(city => {
      const state = State.getStateByCodeAndCountry(city.stateCode, 'IN');
      const country = Country.getCountryByCode('IN');
      return {
        value: city.name,
        label: `${city.name}, ${state?.name || ''}, ${country?.name || ''}`,
        stateCode: city.stateCode,
        countryCode: 'IN'
      };
    });

    setAutocompleteCities(options);
  };

  const onFinish = async (values: JobFormData) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (id) {
        await axios.put(`${config.apiUrl}/api/job/${id}`, values, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        message.success('Job updated successfully');
      } else {
        await axios.post(`${config.apiUrl}/api/job/create`, values, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        message.success('Job created successfully');
      }
      navigate('/joblist');
    } catch (error: any) {
      if (error.response) {
        message.error(error.response.data.message || 'Failed to save job');
      } else {
        message.error('Failed to save job');
      }
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  return (
    <div className="p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{id ? 'Edit Job' : 'Create New Job'}</h1>
        <Button 
          className="!bg-gray-900 !text-white hover:!bg-gray-800"
          onClick={() => navigate('/joblist')}
          icon={<ArrowLeftOutlined />}
        >
          Back to Jobs
        </Button>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full"
      >
        <Form.Item
          name="title"
          label="Job Title"
          rules={[{ required: true, message: 'Please enter job title' }]}
        >
          <Input placeholder="Enter job title" />
        </Form.Item>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true }]}
          >
            <AutoComplete
              placeholder="Enter city name"
              onSearch={handleCitySearch}
              options={autocompleteCities}
              onSelect={(value, option: any) => {
                const state = State.getStateByCodeAndCountry(option.stateCode, option.countryCode);
                const country = Country.getCountryByCode(option.countryCode);
                form.setFieldsValue({
                  city: value,
                  state: state?.name || '',
                  country: country?.name || ''
                });
              }}
            />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item
            name="jobtype"
            label="Job Type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select job type">
              <Option value="Full-time">Full-time</Option>
              <Option value="Part-time">Part-time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Remote">Remote</Option>
              <Option value="Hybrid">Hybrid</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="joblevel"
            label="Job Level"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select job level">
              <Option value="Entry">Entry</Option>
              <Option value="Mid-Level">Mid-Level</Option>
              <Option value="Senior">Senior</Option>
              <Option value="Lead">Lead</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="skills"
          label="Required Skills"
          rules={[{ required: true }]}
        >
          <Select
            mode="tags"
            placeholder="Enter required skills"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Job Description"
          rules={[{ required: true, message: 'Please enter job description' }]}
        >
          <ReactQuill 
            theme="snow"
            modules={modules}
            placeholder="Enter detailed job description"
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </Form.Item>

        <Form.Item>
          <div className="flex justify-end gap-4">
            <Button onClick={() => navigate('/joblist')}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {id ? 'Update Job' : 'Create Job'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JobPostingForm;