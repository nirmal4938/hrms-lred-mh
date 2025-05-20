import React, { useState } from "react";
import { Input, Table, Button, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

interface SupportDataType {
  key: React.Key;
  id: string;
  title: string;
  createdBy: string;
  createdOn: string;
  status: "Open" | "Closed" | "Rejected";
}

const SupportTable: React.FC = () => {
  const [data, setData] = useState<SupportDataType[]>([
    {
      key: "1",
      id: "001",
      title: "Support Request 1",
      createdBy: "User A",
      createdOn: "2023-06-01",
      status: "Open",
    },
    {
      key: "2",
      id: "002",
      title: "Support Request 2",
      createdBy: "User B",
      createdOn: "2023-06-02",
      status: "Closed",
    },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const handleView = (id: string) => {
    const selectedTicket = data.find(item => item.id === id);
    if (selectedTicket) {
      navigate(`/ticketdetails/${id}`, { state: { ticket: selectedTicket } });
    }
  };
  

  const columns: ColumnsType<SupportDataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      sorter: (a, b) => a.createdBy.localeCompare(b.createdBy),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status: "Open" | "Closed" | "Rejected") => {
        let color = "green";
        if (status === "Closed") color = "blue";
        else if (status === "Rejected") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex items-center">
          <Button
            type="link"
            icon={<AiOutlineEye size={18} />}
            onClick={() => handleView(record.id)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          />
        </div>
      ),
    },
  ];

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.createdBy.toLowerCase().includes(searchText.toLowerCase()) ||
    item.createdOn.toLowerCase().includes(searchText.toLowerCase()) ||
    item.status.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
      <div className="flex justify-between items-center w-full">
        <Input.Search
          placeholder="Search"
          onChange={handleSearchChange}
          style={{ width: 200 }}
        />
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default SupportTable;
