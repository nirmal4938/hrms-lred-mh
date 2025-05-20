import React, { useState } from "react";
import { Input, Table, Button, Modal, Form, Select } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";

interface LanguageDataType {
  key: React.Key;
  country: string;
  language: string;
  languageCode: string;
  status: boolean;
}

const LanguageTable: React.FC = () => {
  const [data, setData] = useState<LanguageDataType[]>([
    {
      key: "1",
      country: "USA",
      language: "English",
      languageCode: "EN",
      status: true,
    },
    {
      key: "2",
      country: "France",
      language: "French",
      languageCode: "FR",
      status: false,
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLanguage, setNewLanguage] = useState({ country: "", language: "" });

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

  const handleAddLanguageClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    const newLanguageData: LanguageDataType = {
      key: Date.now().toString(),
      country: newLanguage.country,
      language: newLanguage.language,
      languageCode: newLanguage.language.slice(0, 2).toUpperCase(),
      status: true,
    };
    setData([...data, newLanguageData]);
    setFilteredData([...data, newLanguageData]);
    setIsModalVisible(false);
    setNewLanguage({ country: "", language: "" });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setNewLanguage({ country: "", language: "" });
  };

  const columns: ColumnsType<LanguageDataType> = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a, b) => a.country.localeCompare(b.country),
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      sorter: (a, b) => a.language.localeCompare(b.language),
    },
    {
      title: "Language Code",
      dataIndex: "languageCode",
      key: "languageCode",
      sorter: (a, b) => a.languageCode.localeCompare(b.languageCode),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: LanguageDataType) => (
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
      title: "Actions",
      key: "actions",
      render: (text: string, record: LanguageDataType) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: LanguageDataType[]) => {
      console.log("selectedRowKeys: ", selectedRowKeys, "selectedRows: ", selectedRows);
    },
  };

  return (
    <>
      <div className="flex flex-col border border-gray-300 rounded-xl p-3 gap-5">
        <div className="flex justify-between items-center w-full">
          <Input.Search
            placeholder="search"
            onChange={handleSearchChange}
            style={{ width: 200 }}
          />
          <Button
            onClick={handleAddLanguageClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded flex items-center"
          >
            <PlusOutlined />
            Add Language
          </Button>
        </div>
        <div>
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
      <Modal
        title="Add Language"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please select the country!" }]}
          >
            <Select
              value={newLanguage.country}
              onChange={(value) => setNewLanguage({ ...newLanguage, country: value })}
            >
              <Select.Option value="USA">USA</Select.Option>
              <Select.Option value="France">France</Select.Option>
            
            </Select>
          </Form.Item>
          <Form.Item
            label="Language"
            name="language"
            rules={[{ required: true, message: "Please select the language!" }]}
          >
            <Select
              value={newLanguage.language}
              onChange={(value) => setNewLanguage({ ...newLanguage, language: value })}
            >
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="French">French</Select.Option>
            
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LanguageTable;
