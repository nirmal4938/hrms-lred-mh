import React from "react";
import { Modal, Form, Input, Switch, Select } from "antd";
import { AdminType } from "./AdminListTable";

interface ViewEditAdminModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: any) => void;
  adminData: AdminType | null;
  editable: boolean;
}

const ViewEditAdminModal: React.FC<ViewEditAdminModalProps> = ({
  visible,
  onCancel,
  onSave,
  adminData,
  editable,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (adminData) {
      form.setFieldsValue({
        ...adminData,
        status: adminData.status ? "Active" : "Inactive",
      });
    }
  }, [adminData]);

  return (
    <Modal
      visible={visible}
      title={editable ? "Edit Admin" : "View Admin"}
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSave(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      okButtonProps={{ disabled: !editable }}
    >
      <Form form={form} layout="vertical" name="adminForm">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item name="phonenumber" label="Phone Number" rules={[{ required: true, message: "Please input the phone number!" }]}>
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: "Please input the date of birth!" }]}>
        <Input type="date"  disabled={!editable} />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Switch disabled={!editable} />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select the role!" }]}>
          <Select disabled={!editable}>
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Super Admin">Super Admin</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewEditAdminModal;
