import React, { useState } from "react";
import { Input, Card, Button} from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ViewEditBlogGridModal from "./ViewEditBlogGrid";

export interface BlogGridDataType {
  key: React.Key;
  blogName: string;
  category: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  published: boolean;
}

const BlogGrid: React.FC = () => {
  const navigate = useNavigate();
  const [viewEditModalVisible, setViewEditModalVisible] = useState<boolean>(false);
  const [modalEditable, setModalEditable] = useState<boolean>(false);
  const [modalData, setModalData] = useState<BlogGridDataType | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English(India)");
  const [data, setData] = useState<BlogGridDataType[]>([
    {
      key: "1",
      blogName: "Introduction to React Hooks",
      category: "Programming",
      createdBy: "John Doe",
      createdOn: "2021-09-01",
      updatedBy: "Jane Smith",
      updatedOn: "2021-09-15",
      published: true,
    },
    {
      key: "2",
      blogName: "Healthy Eating Habits",
      category: "Health",
      createdBy: "Alice Brown",
      createdOn: "2021-09-05",
      updatedBy: "Jane Smith",
      updatedOn: "2021-09-20",
      published: false,
    },
  ]);

  const [filteredData, setFilteredData] = useState(data);

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

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRefresh = () => {
    setFilteredData(data);
  };

  const handleAddBlogClick = () => {
    navigate("/addblog");
  };
  const handleViewEditModalOpen = (blog: BlogGridDataType, editable: boolean) => {
    setModalData(blog);
    setModalEditable(editable);
    setViewEditModalVisible(true);
  };

  const handleViewEditModalClose = () => {
    setViewEditModalVisible(false);
    setModalData(null);
    setModalEditable(false);
  };

  const handleSaveModal = (updatedBlog: BlogGridDataType) => {
  
    const index = data.findIndex((item) => item.key === updatedBlog.key);
    if (index !== -1) {
   
      const updatedData = [...data];
      updatedData[index] = updatedBlog;
      setData(updatedData);
      setFilteredData(updatedData);
    }
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
          <div className="flex gap-2">
            <div className="flex px-2 py-2 border border-r-2 border-gray-300 rounded">
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
              onClick={handleAddBlogClick}
              className=" !bg-gray-900  hover:!bg-gray-800 text-white font-semibold h-10 px-4 rounded flex items-center"
            >
              <PlusOutlined />
              Add Blog
            </Button>
            {/* <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="1">Blog Name</Menu.Item>
                      <Menu.Item key="2">Category</Menu.Item>
                      <Menu.Item key="3">Created By</Menu.Item>
                      <Menu.Item key="4">Created On</Menu.Item>
                      <Menu.Item key="5">Updated By</Menu.Item>
                      <Menu.Item key="6">Updated On</Menu.Item>
                      <Menu.Item key="7">Published</Menu.Item>
                    </Menu>
                  }
                >
                  <Button className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold h-10 px-4 rounded">
                    Column
                    <DownOutlined />
                  </Button>
                </Dropdown>
                <Button
                  className="flex items-center text-gray-500 border border-gray-500"
                  icon={<ReloadOutlined />}
                  onClick={handleRefresh}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            <Card size="small" key={item.key}>
              <div className="flex flex-col">
                <img
                  src={`https://images.unsplash.com/photo-1533167649158-6d508895b680?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                  alt="Blog"
                  className="h-[200px] w-full object-cover"
                />
                <div className="font-bold text-lg">{item.blogName}</div>
                <p className="text-gray-500">{item.category}</p>
                <hr className="mt-2"/>
                <div className="flex justify-between items-center mt-2 ">
                    <div className="flex gap-2">
                    <Button className="bg-blue-300 text-blue-500"  onClick={() => handleViewEditModalOpen(item, false)}  icon={<EyeOutlined  />} />
                  <Button className="bg-blue-300 text-blue-500"  onClick={() => handleViewEditModalOpen(item, true)}  icon={<EditOutlined />} />
                  <Button
                 className="bg-red-300 text-red-500" 
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(item.key)}
                  />

                    </div>
                <div className="text-gray-500">
                {item.createdOn}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ViewEditBlogGridModal
        visible={viewEditModalVisible}
        onCancel={handleViewEditModalClose}
        onSave={(values) => {
          handleSaveModal(values);
          handleViewEditModalClose();
        }}
        blogData={modalData}
        editable={modalEditable}
      />
      </div>
    </>
  );
};

export default BlogGrid;
