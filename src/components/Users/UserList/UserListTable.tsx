import React, { useState, useEffect } from 'react';
import { Input, Table, Button, Dropdown, Menu, Select, Checkbox } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined, DownOutlined, ReloadOutlined, UserOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AddUserModal from './AddUserModal';
import ViewEditUserModal from './ViewEditUserModal';
import config from '../../../config/config';

const { Option } = Select;

export interface UserType {
  key: string;
  name: string;
  email: string;
  status: boolean;
  userid: string;
}

const UserListTable: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('English(India)');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<UserType[]>([]);
  const [filteredData, setFilteredData] = useState<UserType[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'email', 'phoneNumber', 'dob', 'status', 'action']);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isViewEditModalVisible, setIsViewEditModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // Fetch API data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/user`); // Replace with actual API URL
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from API");
      }
  
      const result = await response.json();
      console.log("API Response:", result); // Debugging API response
  
      const formattedData = result.map((item: any, index: number) => ({
        key: item._id, // Use _id as key
        name: item.name,
        email: item.email,
        phoneNumber: item.phoneNumber,
        dob: item.dob ? item.dob.split('T')[0] : '', // Extract date part
        status: item.status, // Boolean true/false
        userid: item.userid
      }));
  
      setData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleDelete = (key: string) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData(newData);
  };

  const handleColumnChange = (key: string) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(key) ? prevColumns.filter((col) => col !== key) : [...prevColumns, key]
    );
  };

  const handleRefresh = () => {
    fetchUserData();
    setVisibleColumns(['name', 'email', 'phoneNumber', 'dob', 'status', 'action']);
  };

  const handleViewEdit = (record: UserType, editable: boolean) => {
    setSelectedUser(record);
    setIsEditable(editable);
    setIsViewEditModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: UserType, b: UserType) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <div>
          <UserOutlined style={{ marginRight: 8 }} />
          {text}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: UserType, b: UserType) => a.email.localeCompare(b.email),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean, record: UserType) => (
        <Checkbox
          checked={status}
          onChange={() => {
            const newData = data.map((item) =>
              item.key === record.key ? { ...item, status: !item.status } : item
            );
            setData(newData);
            setFilteredData(newData);
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: string, record: UserType) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewEdit(record, false)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => handleViewEdit(record, true)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </div>
      ),
    },
  ];

  const filteredColumns = columns.filter((col) => visibleColumns.includes(col.key as string));

  const columnMenu = (
    <Menu>
      {columns.map((col) => (
        <Menu.Item key={col.key}>
          <Checkbox checked={visibleColumns.includes(col.key as string)} onChange={() => handleColumnChange(col.key as string)}>
            {col.title as React.ReactNode}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
        <div className="flex justify-between items-center w-full">
          <Input.Search placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} style={{ width: 200 }} />
          <div className="flex gap-2">
            <Dropdown overlay={columnMenu}>
              <Button className="bg-gray-900 text-white font-semibold h-10 px-4 rounded">
                Columns <DownOutlined />
              </Button>
            </Dropdown>
            <Button className="bg-gray-900 text-white font-semibold h-10 px-4 rounded" onClick={() => setIsFilterVisible(!isFilterVisible)}>
              <FilterOutlined /> Filter
            </Button>
            <ReloadOutlined onClick={handleRefresh} />
          </div>
        </div>

        <Table columns={filteredColumns} dataSource={filteredData} pagination={{ pageSize: 5 }} />

        {isViewEditModalVisible && selectedUser && (
          <ViewEditUserModal
            visible={isViewEditModalVisible}
            user={selectedUser}
            isEditable={isEditable}
            onSave={(updatedUser) => {
              setData((prevData) => prevData.map((item) => (item.key === updatedUser.key ? updatedUser : item)));
              setFilteredData((prevData) => prevData.map((item) => (item.key === updatedUser.key ? updatedUser : item)));
              setIsViewEditModalVisible(false);
            }}
            onCancel={() => setIsViewEditModalVisible(false)}
          />
        )}
      </div>
    </>
  );
};

export default UserListTable;
