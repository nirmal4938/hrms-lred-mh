import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Switch, Select, message } from "antd";
import { FAQType } from "./FaqTable";
import axios from "axios";
import config from "../../../config/config";

interface EditViewFaqTableProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
  faq: FAQType | null;
  isEdit: boolean;
}

interface CategoryOption {
  value: string;
  label: string;
}

const EditViewFaqTable: React.FC<EditViewFaqTableProps> = ({
  visible,
  onCancel,
  onSave,
  faq,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/api/faq-categories`);
        const categoryOptions = response.data.map((cat: any) => ({
          value: cat._id,
          label: cat.name
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (faq) {
      form.setFieldsValue({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        status: faq.status
      });
    }
  }, [faq, form]);
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem('accessToken');
      
      // Format the data for the API
      const updatedFaq = {
        question: values.question,
        answer: values.answer,
        category: values.category,
        status: values.status || false
      };

      await axios.put(
        `${config.apiUrl}/api/faqs/${faq?.id}`, // Correct API endpoint
        updatedFaq,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      onSave(values);
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Update error:", error.response?.data);
        message.error(error.response?.data?.message || 'Failed to update FAQ');
      } else {
        console.error("Error updating FAQ:", error);
        message.error('An unexpected error occurred');
      }
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit FAQ" : "View FAQ"}
      open={visible}
      onCancel={onCancel}
      onOk={handleSave}
      okText={isEdit ? "Save" : "Close"}
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="question"
          label="Question"
          rules={[{ required: true, message: "Please enter the question!" }]}
        >
          <Input disabled={!isEdit} />
        </Form.Item>
        <Form.Item
          name="answer"
          label="Answer"
          rules={[{ required: true, message: "Please enter the answer!" }]}
        >
          <Input.TextArea disabled={!isEdit} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select
            disabled={!isEdit}
            options={categories}
            placeholder="Select a category"
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>
      
        <Form.Item
          name="status"
          label="Status"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch disabled={!isEdit} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditViewFaqTable;
