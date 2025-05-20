import React from 'react';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { EmailTemplateType } from './EmailTemplateTable';


interface ViewEditEmailTemplateModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: EmailTemplateType) => void;
  templateData: EmailTemplateType | null;
  editable: boolean;
}

const ViewEditEmailTemplateModal: React.FC<ViewEditEmailTemplateModalProps> = ({
  visible,
  onCancel,
  onSave,
  templateData,
  editable,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (templateData) {
      form.setFieldsValue(templateData);
    }
  }, [templateData, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onSave({ ...values, key: templateData?.key } as EmailTemplateType);
    });
  };

  return (
    <Modal
      title={editable ? 'Edit Email Template' : 'View Email Template'}
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      footer={[
        <Button key="back" onClick={onCancel}>
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
          name="templateTitle"
          label="Template Title"
          rules={[{ required: true, message: 'Please input the template title!' }]}
        >
          <Input disabled={!editable} />
        </Form.Item>
        <Form.Item
          name="modifiedBy"
          label="Modified By"
          rules={[{ required: true, message: 'Please input the modified by!' }]}
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
          name="status"
          label="Status"
          valuePropName="checked"
        >
          <Switch disabled={!editable} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewEditEmailTemplateModal;
