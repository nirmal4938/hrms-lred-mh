import React, { useEffect } from 'react';
import { Modal, Form, Input, Switch } from 'antd';
import { UserType } from './UserListTable';

interface ViewEditUserModalProps {
  visible: boolean;
  user: UserType;
  isEditable: boolean;
  onSave: (updatedUser: UserType) => void;
  onCancel: () => void;
}

const ViewEditUserModal: React.FC<ViewEditUserModalProps> = ({ visible, user, isEditable, onSave, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        ...user,
      });
    }
  }, [user, form]);

  return (
    <Modal
      open={visible} // Use "open" instead of "visible" (Ant Design v4+)
      title={isEditable ? 'Edit User' : 'View User'}
      okText={isEditable ? 'Save' : 'OK'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onSave({ ...user, ...values }); // Ensure existing user data is merged
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      okButtonProps={{ disabled: !isEditable }}
    >
      <Form form={form} layout="vertical" name="userForm">
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="phonenumber" label="Phone Number" rules={[{ required: true, message: 'Please input the phone number!' }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please input the date of birth!' }]}>
          <Input type="date" disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="status" label="Status" valuePropName="checked">
          <Switch disabled={!isEditable} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewEditUserModal;
