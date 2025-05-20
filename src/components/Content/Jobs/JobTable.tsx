import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Table, Button, Tag, message } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import config from '../../../config/config';

// Update the interface to match the API response
interface JobDataType {
  key: string;
  id: string;
  title: string;
  city: string;
  state: string;
  country: string;
  salary: string;
  jobtype: string;
  joblevel: string;
  NumberOfPost: number;
  category: string;
  skills: string[];
  description: string;
  responsibilities: string[];
  author: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

const JobTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<JobDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<JobDataType[]>([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Update the fetchJobs function to include authentication and handle the new response structure
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${config.apiUrl}/api/job/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const jobs = response.data.data.map((job: any) => ({
        key: job._id,
        id: job._id,
        title: job.title || '',
        city: job.city || '',
        state: job.state || '',
        country: job.country || '',
        salary: job.salary || '',
        jobtype: job.jobtype || '',
        joblevel: job.joblevel || '',
        NumberOfPost: job.NumberOfPost || 0,
        category: job.category || '',
        skills: job.skills || [],
        description: job.description || '',
        responsibilities: job.responsibilities || [],
        author: job.author || { _id: '', name: 'Unknown', email: '' },
        createdAt: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : '',
        updatedAt: job.updatedAt ? new Date(job.updatedAt).toLocaleDateString() : '',
      }));
      setData(jobs);
      setFilteredData(jobs);
    } catch (error) {
      message.error("Failed to fetch jobs.");
    }
    setLoading(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      Object.values(item).some((val) => String(val).toLowerCase().includes(value))
    );
    setFilteredData(filtered);
  };

  // Update the handleDelete function to include authentication
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${config.apiUrl}/api/job/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      message.success("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      message.error("Failed to delete job.");
    }
  };

  // Update the columns to display the new data structure
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: JobDataType, b: JobDataType) => a.title.localeCompare(b.title),
    },
    {
      title: "Location",
      key: "location",
      render: (text: string, record: JobDataType) => (
        <span>{`${record.city}, ${record.state}, ${record.country}`}</span>
      ),
    },
    {
      title: "Job Type",
      dataIndex: "jobtype",
      key: "jobtype",
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: "Level",
      dataIndex: "joblevel",
      key: "joblevel",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    // {
    //   title: "Skills",
    //   dataIndex: "skills",
    //   key: "skills",
    //   render: (skills: string[]) => (
    //     <span>
    //       {skills.map(skill => (
    //         <Tag key={skill} color="purple" style={{ marginRight: 4 }}>
    //           {skill}
    //         </Tag>
    //       ))}
    //     </span>
    //   ),
    // },
    {
      title: "Posted By",
      key: "author",
      render: (text: string, record: JobDataType) => (
        <span>{record.author?.name || 'Unknown'}</span>
      ),
    },
    {
      title: "Posted On",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: JobDataType) => (
        <div>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/jobs/${record.id}`)}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/jobpost/edit/${record.id}`)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
    <div className="text-2xl font-bold">Job List</div>
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search jobs"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
        <Button
          onClick={() => navigate("/jobpost")}
          type="primary"
          icon={<PlusOutlined />}
          className="!bg-gray-900 !text-white hover:!bg-gray-800"
        >
          Add Job
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};

export default JobTable;