import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Switch, message } from "antd";
import type { CategoryDataType } from "./BlogCategoryTable";
import axios from "axios";
import config from "../../../../config/config";

interface EditCategoryModalProps {
  isVisible: boolean;
  categoryData: CategoryDataType | null;
  onCancel: () => void;
  onSave: (updatedCategory: CategoryDataType) => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isVisible,
  categoryData,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();
  const [editedCategory, setEditedCategory] = useState<CategoryDataType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isVisible && categoryData) {
      setEditedCategory(categoryData);
      form.setFieldsValue({
        category: categoryData.category,
        status: categoryData.status,
      });
    }
  }, [isVisible, categoryData, form]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const token = localStorage.getItem('accessToken');
      
      // Make API call to update the category
      await axios.put(
        `${config.apiUrl}/api/blog-category/${editedCategory?.id}`,
        {
          name: values.category,
          status: values.status
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Call the onSave prop with updated category data
      onSave({
        ...editedCategory!,
        ...values,
        category: values.category,
        status: values.status || false,
        updatedOn: new Date().toLocaleDateString(),
        updatedBy: "Admin"
      });

      message.success('Category updated successfully');
      onCancel(); // Close the modal
    } catch (error) {
      if (axios.isAxiosError(error)) {
        message.error(error.response?.data?.message || 'Failed to update category');
      } else {
        message.error('An unexpected error occurred');
      }
      console.log("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Category"
      open={isVisible}
      onCancel={onCancel}
      onOk={handleSave}
      okText="Save"
      cancelText="Cancel"
      confirmLoading={loading}
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

export default EditCategoryModal;
