import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import ViewEditRoleTable from "./ViewEditRoleTable";

export interface RoleType {
  key: React.Key;
  role: string;
  description: string;
  userCount: number;
  updatedBy: string;
  updatedOn: string;
}

const RoleTable: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<RoleType[]>([
    {
      key: "1",
      role: "Admin",
      description: "Administrator",
      userCount: 5,
      updatedBy: "John Doe",
      updatedOn: "2021-09-01",
    },
    {
      key: "2",
      role: "User",
      description: "Regular User",
      userCount: 100,
      updatedBy: "Alice Brown",
      updatedOn: "2021-09-02",
    },
    {
      key: "3",
      role: "Manager",
      description: "Managerial Role",
      userCount: 10,
      updatedBy: "Jane Smith",
      updatedOn: "2021-09-03",
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "role",
    "description",
    "userCount",
    "updatedBy",
    "updatedOn",
    "action",
  ]);

  const [viewEditRoleModalVisible, setViewEditRoleModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filtered = data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData(newData);
  };

  const handleAddRoleClick = () => {
    navigate("/addrole");
  };

  const handleEdit = (record: RoleType) => {
    setSelectedRole(record);
    setIsViewMode(false);
    setViewEditRoleModalVisible(true);
  };

  const handleView = (record: RoleType) => {
    setSelectedRole(record);
    setIsViewMode(true);
    setViewEditRoleModalVisible(true);
  };

  const handleSaveRole = (updatedRole: RoleType) => {
    const updatedData = data.map((item) =>
      item.key === updatedRole.key ? updatedRole : item
    );
    setData(updatedData);
    setFilteredData(updatedData);
    setViewEditRoleModalVisible(false);
  };

  const columns: ColumnsType<RoleType> = [
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "User Count",
      dataIndex: "userCount",
      key: "userCount",
      sorter: (a, b) => a.userCount - b.userCount,
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
      sorter: (a, b) => a.updatedBy.localeCompare(b.updatedBy),
    },
    {
      title: "Updated On",
      dataIndex: "updatedOn",
      key: "updatedOn",
      sorter: (a, b) => a.updatedOn.localeCompare(b.updatedOn),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: RoleType) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.key as string)
  );

  const rowSelection = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: RoleType[]
    ) => {
      console.log(
        "selectedRowKeys: ",
        selectedRowKeys,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
        <div className="flex justify-between items-center w-full">
          <Input.Search
            placeholder="Search"
            onChange={handleSearchChange}
            style={{ width: 200 }}
          />
          <div className="flex gap-2 items-center">
            <Button
              onClick={handleAddRoleClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded flex items-center"
            >
              <PlusOutlined />
              Add Role
            </Button>
          </div>
        </div>
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={filteredColumns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      {/* Modal for View/Edit Role */}
      {selectedRole && (
        <ViewEditRoleTable
          roleData={selectedRole}
          visible={viewEditRoleModalVisible}
          onCancel={() => setViewEditRoleModalVisible(false)}
          onSave={handleSaveRole}
          isViewMode={isViewMode}
          />
        )}
      </>
    );
  };
  
  export default RoleTable;
  
