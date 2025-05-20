import React from "react";
import { Modal, Form, Input, Switch, Button } from "antd";
import { BlogGridDataType } from "./BlogGrid";


interface ViewEditBlogGridModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: BlogGridDataType) => void;
  blogData: BlogGridDataType | null;
  editable: boolean;
}


const ViewEditBlogGridModal: React.FC<ViewEditBlogGridModalProps> = ({
  visible,
  onCancel,
  onSave,
  blogData,
  editable,
}) => {
  const [form] = Form.useForm();


  React.useEffect(() => {
    form.setFieldsValue(blogData);
  }, [blogData, form]);


  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave({ ...blogData, ...values });
    });
  };


  return (
    <Modal
      title={editable ? "Edit Blog" : "View Blog"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        editable && (
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>
        ),
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="blogName" label="Blog Name">
          <Input disabled={!editable} />
        </Form.Item>
       
        <Form.Item name="createdOn" label="Created On">
        <Input type="date"  disabled={!editable} />
        </Form.Item>
        <Form.Item name="updatedBy" label="Updated By">
          <Input disabled={!editable} />
        </Form.Item>
     
        <Form.Item name="published" label="Published" valuePropName="checked">
          <Switch disabled={!editable} />
        </Form.Item>
      </Form>
    </Modal>
  );
};


export default ViewEditBlogGridModal;