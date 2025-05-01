import React from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

const LoginPage = () => {
  const onFinish = async (values) => {
    console.log("Sending to backend:", values);
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/partnerLogin",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response:", res.data);
  
      const { token, username, provider } = res.data;
  
      console.log("Provider Data:", provider);
  
      localStorage.setItem("urbanPartnerToken", token);
      localStorage.setItem("urbanPartnerUsername", username);
      localStorage.setItem('partnerId', res.data.data._id);
      
  
      message.success("Login successful");
  
      window.location.href = "/partnerdashboard";
    } catch (error) {
      message.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 to-green-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
          UrbanPartner Login
        </h2>

        <Form
          name="loginForm"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              placeholder="Enter your email"
              className="rounded-md p-3 border border-gray-300"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="rounded-md p-3 border border-gray-300"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md shadow-md"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="#" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
