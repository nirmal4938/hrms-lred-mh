
import React from 'react';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { BlogDataType } from './BlogTable'; 

interface ViewEditBlogModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: BlogDataType) => void;
  blogData: BlogDataType | null;
  editable: boolean;
}

const ViewEditBlogModal: React.FC<ViewEditBlogModalProps> = ({
  visible,
  onClose,
  onSave,
  blogData,
  editable,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (blogData) {
      form.setFieldsValue(blogData);
    }
  }, [blogData, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave({ ...values, key: blogData?.key } as BlogDataType);
    });
  };

  return (
    <Modal
      title={editable ? 'Edit Blog' : 'View Blog'}
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        editable && (
          <Button key="submit" type="primary" onClick={handleOk}>
            Save
          </Button>
        ),
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="blogName"
          label="Blog Name"
          rules={[{ required: true, message: 'Please input the blog name!' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item
          name="createdBy"
          label="Created By"
          rules={[{ required: true, message: 'Please input the created by!' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item
          name="createdOn"
          label="Created On"
          rules={[{ required: true, message: 'Please input the created on!' }]}
        >
           <Input type="date"  disabled={!editable} />
        
        </Form.Item>
        <Form.Item
          name="updatedBy"
          label="Updated By"
          rules={[{ required: true, message: 'Please input the updated by!' }]}
        >
        
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item
          name="updatedOn"
          label="Updated On"
          rules={[{ required: true, message: 'Please input the updated on!' }]}
        >
           <Input type="date"  disabled={!editable} />
         
        </Form.Item>
        <Form.Item
          name="published"
          label="Published"
          valuePropName="checked"
        >
          <Switch disabled={!editable} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewEditBlogModal;
