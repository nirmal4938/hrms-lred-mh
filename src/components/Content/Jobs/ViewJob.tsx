import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spin, Tag, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../config/config';

interface JobDetails {
  title: string;
  description: string;
  city: string;
  state: string;
  country: string;
  salary: string;
  jobtype: string;
  joblevel: string;
  NumberOfPost: number;
  category: string;
  skills: string[];
  responsibilities: string[];
  createdAt: string;
  updatedAt: string;
}

const ViewJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${config.apiUrl}/api/job/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setJob(response.data.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">Job not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/joblist')}
          className="!bg-gray-900 !text-white hover:!bg-gray-800"
        >
          Back to Jobs
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.jobtype &&<Tag color="blue">{job.jobtype}</Tag>}
            {job.joblevel &&<Tag color="green">{job.joblevel}</Tag>}
          </div>
          <p className="text-gray-600">
            {job.city}, {job.state}, {job.country}
          </p>
        </div>

        <Divider />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <div className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: job.description }} 
          />
        </div>

        <Divider />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <Tag key={index} color="purple">{skill}</Tag>
            ))}
          </div>
        </div>

        <Divider />

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-2">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="text-gray-700">{responsibility}</li>
            ))}
          </ul>
        </div>

        <Divider />

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p><strong>Number of Positions:</strong> {job.NumberOfPost}</p>
          </div>
          <div>
            <p><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(job.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;