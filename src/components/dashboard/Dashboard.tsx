import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select } from 'antd';
import { FileTextOutlined, BookOutlined, FolderOutlined, CalendarOutlined } from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';


const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');


  const [stats, setStats] = useState({
    totalPosts: 128,
    totalOpenJobs: 34,
    totalJobs: 212,
    totalBlogs: 76,
    contentStatus: {
      scheduled: 15,
      published: 98,
      draft: 23,
    }
  });


  const [jobMetrics, setJobMetrics] = useState({
    weeklyJobs: 12,
    totalViews: 5000,
    applications: 30,
    jobStatus: {
      open: 34,
      closed: 178
    },
    contentOverTime: [
      { month: 'Jan', posts: 45, blogs: 32, jobs: 28 },
      { month: 'Feb', posts: 52, blogs: 38, jobs: 35 },
      { month: 'Mar', posts: 48, blogs: 35, jobs: 30 },
      { month: 'Apr', posts: 58, blogs: 42, jobs: 38 }
    ],
    topCompanies: [
      { name: 'Tech Corp', posts: 45, views: 2300 },
      { name: 'Innovate Inc', posts: 38, views: 1900 },
      { name: 'Digital Solutions', posts: 32, views: 1600 }
    ],
    topContent: [
      { title: 'Senior Developer Position', type: 'Job', views: 1200, applications: 45 },
      { title: 'Tech Trends 2024', type: 'Blog', views: 980, comments: 32 },
      { title: 'Product Manager Role', type: 'Job', views: 850, applications: 28 }
    ]
  });


  const handleTimeRangeChange = (value:any) => {
    setTimeRange(value);
    // Additional logic for data filtering could go here
  };


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (!response.ok) throw new Error("API error");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats, using fallback data.');
        // Fallback values already in useState
      }
    };


    fetchStats();
  }, []);


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Content Management Dashboard</h1>
        <Select
          defaultValue="week"
          style={{ width: 120 }}
          onChange={handleTimeRangeChange}
          options={[
            { value: 'day', label: 'Daily' },
            { value: 'week', label: 'Weekly' },
            { value: 'month', label: 'Monthly' }
          ]}
        />
      </div>


      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Posts"
              value={stats.totalPosts}
              prefix={<FileTextOutlined className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Open Jobs"
              value={stats.totalOpenJobs}
              prefix={<BookOutlined className="text-green-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Jobs Posted"
              value={stats.totalJobs}
              prefix={<FolderOutlined className="text-purple-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Blogs"
              value={stats.totalBlogs}
              prefix={<CalendarOutlined className="text-orange-500" />}
            />
          </Card>
        </Col>
      </Row>


      {/* Job Board Metrics */}
      <h2 className="text-xl font-semibold mb-4 mt-8">Job Board Metrics</h2>
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="New Jobs This Week"
              value={jobMetrics.weeklyJobs}
              suffix="/ Week"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Job Views"
              value={jobMetrics.totalViews}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Applications Submitted"
              value={jobMetrics.applications}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Open Jobs"
              value={jobMetrics.jobStatus.open}
              suffix={`/ ${jobMetrics.jobStatus.open + jobMetrics.jobStatus.closed}`}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>


      {/* Charts */}
      <h2 className="text-xl font-semibold mb-4">Content Analytics</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Content Distribution">
            <div style={{ height: '300px' }}>
              <Pie
                data={[
                  { type: 'Scheduled', value: stats.contentStatus.scheduled },
                  { type: 'Published', value: stats.contentStatus.published },
                  { type: 'Draft', value: stats.contentStatus.draft }
                ]}
                angleField="value"
                colorField="type"
                radius={0.8}
                height={300}
                label={{
                  type: 'inner',
                  offset: '-30%',
                  formatter: (datum: any) => {
                    const total = stats.contentStatus.scheduled + stats.contentStatus.published + stats.contentStatus.draft;
                    const percent = (datum.value / total * 100).toFixed(0);
                    return `${percent}%`;
                  },
                  style: {
                    fontSize: 14,
                    textAlign: 'center'
                  }
                }}
                legend={{ position: 'bottom' }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card title="Content Publishing Trends">
            <div style={{ height: 400 }}>
              <Line
                data={jobMetrics.contentOverTime.flatMap(item => ([
                  { date: item.month, type: 'Posts', value: item.posts },
                  { date: item.month, type: 'Blogs', value: item.blogs },
                  { date: item.month, type: 'Jobs', value: item.jobs }
                ]))}
                xField="date"
                yField="value"
                seriesField="type"
                smooth
                point={{ size: 5, shape: 'diamond' }}
                legend={{ position: 'top' }}
                tooltip={{
                  title: 'date',
                  formatter: (datum: any) => ({ name: datum.type, value: datum.value })
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};


export default Dashboard;





