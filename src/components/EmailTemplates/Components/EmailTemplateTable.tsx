import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ViewEditEmailTemplateModal from "./ViewEditEmailTemplateModal";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";



export interface EmailTemplateType {
  key: React.Key;
  templateTitle: string;
  modifiedBy: string;
  createdBy: string;
  createdOn: string;
  status: boolean;
}

const EmailTemplatesTable: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English(India)");
  const [selectionType] = useState<"checkbox" | "radio">("checkbox");
  const [data, setData] = useState<EmailTemplateType[]>([
    {
      key: "1",
      templateTitle: "Welcome Email",
      modifiedBy: "John Doe",
      createdBy: "Jane Smith",
      createdOn: "2021-09-01",
      status: true,
    },
    {
      key: "2",
      templateTitle: "Password Reset",
      modifiedBy: "Alice Brown",
      createdBy: "Jane Smith",
      createdOn: "2021-09-02",
      status: false,
    },
    {
      key: "3",
      templateTitle: "Newsletter",
      modifiedBy: "John Doe",
      createdBy: "Alice Brown",
      createdOn: "2021-09-03",
      status: true,
    },
    {
      key: "4",
      templateTitle: "Promotion",
      modifiedBy: "Jane Smith",
      createdBy: "John Doe",
      createdOn: "2021-09-04",
      status: false,
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "templateTitle",
    "modifiedBy",
    "createdBy",
    "createdOn",
    "status",
    "action",
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplateType | null>(null);
  const [modalEditable, setModalEditable] = useState(false);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

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

  const handleTableChange: TableProps<EmailTemplateType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table params:", pagination, filters, sorter, extra);
  };

  const handleAddTemplateClick = () => {
    navigate("/addemailtemplate");
  };

  const handleModalSave = (values: EmailTemplateType) => {
    const newData = data.map((item) =>
      item.key === selectedTemplate?.key ? { ...item, ...values } : item
    );
    setData(newData);
    setFilteredData(newData);
    setIsModalVisible(false);
    setSelectedTemplate(null);
  };

  const columns: ColumnsType<EmailTemplateType> = [
    {
      title: "Template Title",
      dataIndex: "templateTitle",
      key: "templateTitle",
      sorter: (a, b) => a.templateTitle.localeCompare(b.templateTitle),
    },
    {
      title: "Modified By",
      dataIndex: "modifiedBy",
      key: "modifiedBy",
      sorter: (a, b) => a.modifiedBy.localeCompare(b.modifiedBy),
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
      render: (status: boolean, record: EmailTemplateType) => (
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
      render: (text: string, record: EmailTemplateType) => (
        <div>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedTemplate(record);
              setModalEditable(false);
              setIsModalVisible(true);
            }}
          />
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedTemplate(record);
              setModalEditable(true);
              setIsModalVisible(true);
            }}
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

  const filteredColumns = columns.filter((col) =>
    visibleColumns.includes(col.key as string)
  );

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: EmailTemplateType[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys, "selectedRows: ", selectedRows);
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
            <div className="flex items-center px-2 py-2 border border-r-2 border-gray-300 rounded">
              <div style={{ borderRight: "1px solid #ccc", paddingRight: "8px" }}>
                Lang
              </div>
              <select
                className="outline-none"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option value="English(India)">English(India)</option>
                <option value="English(US)">English(US)</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>
            <Button
              onClick={handleAddTemplateClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded flex items-center"
            >
              <PlusOutlined />
              Add Template
            </Button>
          </div>
        </div>
        <div>
          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={filteredColumns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            onChange={handleTableChange}
          />
        </div>
      </div>
      {selectedTemplate && (
        <ViewEditEmailTemplateModal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setSelectedTemplate(null);
          }}
          onSave={handleModalSave}
          templateData={selectedTemplate}
          editable={modalEditable}
        />
      )}
    </>
  );
};

export default EmailTemplatesTable;
