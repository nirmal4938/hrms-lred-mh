import React, { useState, useEffect } from "react";
import type { CategoryDataType } from "./FaqCategoryTable";
import axios from "axios";
import config from "../../../../config/config";
import { Modal, Form, Input, Switch, message, Button } from "antd";

interface EditFaqCategoryProps {
  visible: boolean;
  categoryData: CategoryDataType | null;
  onEditCategory: (editedCategory: CategoryDataType) => void;
  onCancel: () => void;
}

const EditFaqCategory: React.FC<EditFaqCategoryProps> = ({
  visible,
  categoryData,
  onEditCategory,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [editedCategory, setEditedCategory] = useState<CategoryDataType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && categoryData) {
      setEditedCategory(categoryData);
      form.setFieldsValue({
        category: categoryData.category,
        createdBy: categoryData.createdBy,
        createdOn: categoryData.createdOn,
        updatedBy: categoryData.updatedBy,
        updatedOn: categoryData.updatedOn,
        status: categoryData.status,
      });
    }
  }, [visible, categoryData, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onEditCategory({
        ...editedCategory!,
        ...values,
        updatedOn: new Date().toISOString().split("T")[0],
        updatedBy: "Admin",
        status: values.status || false,
      });
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      console.log(categoryData)
      
      // await axios.delete(`${config.apiUrl}/api/faq-category/${categoryData?.id}`, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      message.success('Category deleted successfully');
      onCancel(); // Close the modal
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Failed to delete category');
      } else {
        message.error('An unexpected error occurred');
      }
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Category"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="delete" type="primary" danger onClick={handleDelete} loading={loading}>
          Delete
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave} loading={loading}>
          Save
        </Button>
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="count"
          label="Count"
          rules={[{ required: true, message: "Please input the count!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="createdBy"
          label="Created By"
          rules={[{ required: true, message: "Please input the creator!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="createdOn"
          label="Created On"
          rules={[{ required: true, message: "Please input the creation date!" }]}
        >
         <Input type="date" />
        </Form.Item>
        <Form.Item
          name="updatedBy"
          label="Updated By"
          rules={[{ required: true, message: "Please input the updater!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="updatedOn"
          label="Updated On"
          rules={[{ required: true, message: "Please input the update date!" }]}
        >
          <Input type="date" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditFaqCategory;
