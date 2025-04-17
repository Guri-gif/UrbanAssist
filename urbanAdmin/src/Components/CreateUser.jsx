import { UserAddOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Select, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const { Option } = Select;

const CreateUser = () => {
  const [toggle, setToggle] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      await axios.post("http://localhost:5000/api/auth/createUser", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      toast.success(`Onboarded ${values.username} successfully`);
      form.resetFields();
      setToggle(false);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user.");
    }
  };

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-30 bg-black text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setToggle(true)}
      >
        <UserAddOutlined style={{ fontSize: "24px" }} />
      </div>

      <Modal
        title="Create User"
        open={toggle}
        onCancel={() => setToggle(false)}
        footer={[
          <Button key="cancel" onClick={() => setToggle(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            initialValue="user"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;
