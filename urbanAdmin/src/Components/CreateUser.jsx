import { UserAddOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(
      "http://localhost:5000/api/auth/createUser",
      {
        email,
        username,
        password,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      },
      toast.success(`Onboarded ${username} successfully`),
      setToggle(false)
    );
  };
  return (
    <>
      <div className="fixed bottom-4 right-4 z-30 bg-black text-white p-3 rounded-full shadow-lg cursor-pointer">
        <UserAddOutlined
          style={{ fontSize: "24px" }}
          onClick={() => setToggle(true)}
        />
      </div>

      {toggle && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="bg-white w-[400px] p-6 rounded-lg shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
              onClick={() => setToggle(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Create User</h2>
            <form method="post" onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                required
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                required
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Role
              </label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                type="submit"
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUser;
