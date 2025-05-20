import React, { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { RoleType } from "./RoleTable"; // Adjust the import path as per your file structure

interface ViewEditRoleTableProps {
  roleData: RoleType;
  visible: boolean;
  onCancel: () => void;
  onSave: (updatedRole: RoleType) => void;
  isViewMode: boolean;
}

const ViewEditRoleTable: React.FC<ViewEditRoleTableProps> = ({
  roleData,
  visible,
  onCancel,
  onSave,
  isViewMode,
}) => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form.validateFields().then((values) => {
      const updatedRole: RoleType = { ...roleData, ...values };
      onSave(updatedRole);
      form.resetFields();
    });
  };

  return (
    <Modal
      title={isViewMode ? "View Role" : "Edit Role"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        !isViewMode && (
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>
        ),
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Form form={form} initialValues={roleData}>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Role is required" }]}
        >
          <Input disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required" }]}
        >
          <Input disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          name="userCount"
          label="User Count"
          rules={[
            { required: true, message: "User Count is required" },
          ]}
        >
          <Input type="number" disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          name="updatedBy"
          label="Updated By"
          rules={[{ required: true, message: "Updated By is required" }]}
        >
          <Input disabled={isViewMode} />
        </Form.Item>
        <Form.Item
          name="updatedOn"
          label="Updated On"
          rules={[{ required: true, message: "Updated On is required" }]}
        >
          <Input type="date" disabled={isViewMode} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewEditRoleTable;
