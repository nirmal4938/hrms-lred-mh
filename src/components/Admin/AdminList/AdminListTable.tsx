import React, { useState } from "react";
import { Input, Table, Button, Dropdown, Menu, Checkbox } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  ReloadOutlined,
  UserOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import AddAdminModal from "./AddAdminModal";
import ViewEditAdminModal from "./ViewEditAdminModal"; 

export interface AdminType {
  key: React.Key;
  name: string;
  email: string;
  phonenumber: string;
  dob: string;
  status: boolean;
  role: string;
}

const AdminListTable: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English(India)");
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewEditModalVisible, setIsViewEditModalVisible] = useState(false);
  const [adminToEditView, setAdminToEditView] = useState<AdminType | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState([{ key: "name", type: "contains", value: "" }]);
  const [searchValue, setSearchValue] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState<AdminType[]>([
    {
      key: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phonenumber: "1234567890",
      dob: "1990-01-01",
      status: true,
      role: "Admin",
    },
    {
      key: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phonenumber: "0987654321",
      dob: "1992-02-02",
      status: false,
      role: "Super Admin",
    },
    {
      key: "3",
      name: "Alice Brown",
      email: "alice.brown@example.com",
      phonenumber: "1122334455",
      dob: "1995-03-03",
      status: false,
      role: "Admin",
    },
    {
      key: "4",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      phonenumber: "6677889900",
      dob: "1988-04-04",
      status: true,
      role: "Super Admin",
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "name",
    "email",
    "phonenumber",
    "dob",
    "status",
    "role",
    "action",
  ]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData(newData);
  };

  const handleTableChange: TableProps<AdminType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table params:", pagination, filters, sorter, extra);
  };

  const handleColumnChange = (key: string) => {
    let updatedColumns;
    if (visibleColumns.includes(key)) {
      updatedColumns = visibleColumns.filter((column) => column !== key);
    } else {
      updatedColumns = [...visibleColumns, key];
    }
    setVisibleColumns(updatedColumns);
  };

  const handleRefresh = () => {
    setFilteredData(data);
    setVisibleColumns([
      "name",
      "email",
      "phonenumber",
      "dob",
      "status",
      "role",
      "action",
    ]);
  };

  const handleCreate = (values: any) => {
    const newData = [...data, { key: (data.length + 1).toString(), ...values }];
    setData(newData);
    setFilteredData(newData);
    setIsModalVisible(false);
  };

  const handleViewEdit = (record: AdminType, editable: boolean) => {
    setAdminToEditView(record);
    setIsViewEditModalVisible(true);
    setIsEditable(editable);
  };

  const handleSave = (values: any) => {
    if (adminToEditView) {
      const newData = data.map((item) =>
        item.key === adminToEditView.key ? { ...item, ...values } : item
      );
      setData(newData);
      setFilteredData(newData);
      setIsViewEditModalVisible(false);
      setAdminToEditView(null);
    }
  };

  const columns: ColumnsType<AdminType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <div>
          <UserOutlined style={{ marginRight: 8 }} />
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      key: "phonenumber",
      sorter: (a, b) => a.phonenumber.localeCompare(b.phonenumber),
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
      sorter: (a, b) => a.dob.localeCompare(b.dob),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: AdminType) => (
        <div
          className={`relative inline-block w-10 h-6 rounded-full bg-gray-300 ${
            status ? "bg-green-500" : ""
          } overflow-hidden cursor-pointer`}
          onClick={() => {
            const newData = data.map((item) =>
              item.key === record.key ? { ...item, status: !item.status } : item
            );
            setData(newData);
            setFilteredData(newData);
          }}
        >
          <div
            className={`absolute left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
              status ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: AdminType) => (
        <div>
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleViewEdit(record, false)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => handleViewEdit(record, true)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </div>
      ),
    },
  ];

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.key as string)
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: AdminType[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys, "selectedRows: ", selectedRows);
    },
  };

  const columnMenu = (
    <Menu>
      {columns.map((col) => (
        <Menu.Item key={col.key}>
          <Checkbox
            checked={visibleColumns.includes(col.key as string)}
            onChange={() => handleColumnChange(col.key as string)}
          >
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
          <Input.Search
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 200 }}
          />
          <div className="flex gap-2">
            <div className="flex items-center gap-3">
              <div className="flex px-2 py-2 border border-r-2 border-gray-300 rounded">
                <div style={{ borderRight: "1px solid #ccc", paddingRight: "8px" }}>Lang</div>
                <select className="outline-none" value={selectedLanguage} onChange={handleLanguageChange}>
                  <option value="English(India)">English(India)</option>
                  <option value="English(US)">English(US)</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <Button
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded"
                onClick={() => setIsModalVisible(true)}
              >
                <PlusOutlined /> Add Admin
              </Button>
              <AddAdminModal visible={isModalVisible} onCreate={handleCreate} onCancel={() => setIsModalVisible(false)} />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <Dropdown overlay={columnMenu}>
                  <Button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded">
                    Columns <DownOutlined />
                  </Button>
                </Dropdown>
                <Button
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded"
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  <FilterOutlined /> Filter
                </Button>
                <ReloadOutlined onClick={handleRefresh} />
              </div>
            </div>
          </div>
        </div>

        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={filteredColumns}
          dataSource={filteredData}
          onChange={handleTableChange}
        />
      </div>
      <ViewEditAdminModal
        visible={isViewEditModalVisible}
        onCancel={() => setIsViewEditModalVisible(false)}
        onSave={handleSave}
        adminData={adminToEditView}
        editable={isEditable}
      />
    </>
  );
};

export default AdminListTable;
