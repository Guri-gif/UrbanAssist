import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

const EditUserModal = ({ visible, onCancel, onUpdate, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleFinish = (values) => {
    onUpdate(user.id, values);
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()} 
      okText="Update"
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Select>
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
