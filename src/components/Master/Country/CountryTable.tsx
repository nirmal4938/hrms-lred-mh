import React, { useState } from "react";
import { Input, Table, Button, Modal, Form, Select } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface CountryDataType {
  key: React.Key;
  countryName: string;
  countryCode: string;
  currency: string;
  phoneCode: string;
  status: boolean;
}

const CountryTable: React.FC = () => {
  const [data, setData] = useState<CountryDataType[]>([
    {
      key: "1",
      countryName: "USA",
      countryCode: "US",
      currency: "USD",
      phoneCode: "+1",
      status: true,
    },
    {
      key: "2",
      countryName: "France",
      countryCode: "FR",
      currency: "EUR",
      phoneCode: "+33",
      status: false,
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCountry, setNewCountry] = useState({ countryName: "", countryCode: "", currency: "", phoneCode: "" });

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

  const handleAddCountryClick = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    const newCountryData: CountryDataType = {
      key: Date.now().toString(),
      countryName: newCountry.countryName,
      countryCode: newCountry.countryCode,
      currency: newCountry.currency,
      phoneCode: newCountry.phoneCode,
      status: true,
    };
    setData([...data, newCountryData]);
    setFilteredData([...data, newCountryData]);
    setIsModalVisible(false);
    setNewCountry({ countryName: "", countryCode: "", currency: "", phoneCode: "" });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setNewCountry({ countryName: "", countryCode: "", currency: "", phoneCode: "" });
  };

  const columns: ColumnsType<CountryDataType> = [
    {
      title: "Country Name",
      dataIndex: "countryName",
      key: "countryName",
      sorter: (a, b) => a.countryName.localeCompare(b.countryName),
    },
    {
      title: "Country Code",
      dataIndex: "countryCode",
      key: "countryCode",
      sorter: (a, b) => a.countryCode.localeCompare(b.countryCode),
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      sorter: (a, b) => a.currency.localeCompare(b.currency),
    },
    {
      title: "Phone Code",
      dataIndex: "phoneCode",
      key: "phoneCode",
      sorter: (a, b) => a.phoneCode.localeCompare(b.phoneCode),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: CountryDataType) => (
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
      render: (text: string, record: CountryDataType) => (
        <Button
          type="link"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.key)}
        />
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CountryDataType[]) => {
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
            onClick={handleAddCountryClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded flex items-center"
          >
            <PlusOutlined />
            Add Country
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
        title="Add Country"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Submit"
        cancelText="Cancel"
        width={1000}
      >
        <Form layout="vertical" className="flex gap-4">
          <Form.Item
            label="Country Name"
            name="countryName"
            rules={[{ required: true, message: "Please select the country name!" }]}
            className="w-full sm:w-1/4"
          >
            <Select
              value={newCountry.countryName}
              onChange={(value) => setNewCountry({ ...newCountry, countryName: value })}
            >
              <Select.Option value="USA">USA</Select.Option>
              <Select.Option value="France">France</Select.Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
          <Form.Item
            label="Country Code"
            name="countryCode"
            rules={[{ required: true, message: "Please enter the country code!" }]}
            className="w-full sm:w-1/4"
          >
            <Input
              value={newCountry.countryCode}
              onChange={(e) => setNewCountry({ ...newCountry, countryCode: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: "Please enter the currency code!" }]}
            className="w-full sm:w-1/4"
          >
            <Input
              value={newCountry.currency}
              onChange={(e) => setNewCountry({ ...newCountry, currency: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            label="Phone Code"
            name="phoneCode"
            rules={[{ required: true, message: "Please enter the phone code!" }]}
            className="w-full sm:w-1/4"
          >
            <Input
              value={newCountry.phoneCode}
              onChange={(e) => setNewCountry({ ...newCountry, phoneCode: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CountryTable;
