import React from "react";
import { Modal, Form, Input, Button, Checkbox, DatePicker } from "antd";

interface AddAdminModalProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    onCreate(values);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Add Admin"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={form.submit}>
          Add
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phonenumber" label="Phone Number" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[
            { required: true, message: 'Please select date of birth' },
          ]}
        >

          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item name="role" label="Role" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Checkbox.Group>
            <Checkbox value="Active">Active</Checkbox>
            <Checkbox value="Inactive">Inactive</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddAdminModal;
