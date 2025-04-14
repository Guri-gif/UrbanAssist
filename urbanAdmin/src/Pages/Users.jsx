import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { message, Table } from "antd";
import { toast } from "react-toastify";
import CreateUser from "../Components/CreateUser";

const Users = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/userData");
      const usersWithKey = res.data.map((user) => ({
        key: user._id,
        name: user.username,
        email: user.email,
        role: user.role,
        id: user._id,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
      }));
      setDataSource(usersWithKey);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, []);

  const deleteAccount = async (_id) => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      await axios.delete(`http://localhost:5000/api/auth/deleteUser/${_id}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      message.success("Account deleted successfully");
      toast.success("Account deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Joined On", dataIndex: "createdAt", key: "createdAt" },
    { title: "userID", dataIndex: "id", key: "id" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <DeleteOutlined
            style={{
              color: "red",
              fontSize: 18,
              cursor: "pointer",
              marginRight: 20,
            }}
            onClick={() => deleteAccount(record.id)}
          />
          <EditOutlined style={{ fontSize: 18, cursor: "pointer" }} />
        </>
      ),
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
      <CreateUser />
    </>
  );
};

export default Users;
