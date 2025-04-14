import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const adminlogin = async (values) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/adminLogin`, values);
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Welcome Admin");
      navigate("/mainpage/users");
    } catch (err) {
      toast.error("Invalid credentials", err);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-[#e0ecff] to-[#f7faff] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-gray-100">
        <h1 className="text-center text-4xl font-bold text-blue-800 mb-2 tracking-tight">
          UrbanAssist
        </h1>
        <p className="text-center text-gray-500 mb-8 text-sm">Admin Panel Login</p>

        <Form
          layout="vertical"
          onFinish={adminlogin}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            label={<span className="text-gray-700">Email</span>}
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input className="h-10 rounded-md" />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700">Password</span>}
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password className="h-10 rounded-md" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 bg-blue-700 hover:bg-blue-800 transition-colors duration-200 text-white font-semibold rounded-md"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
