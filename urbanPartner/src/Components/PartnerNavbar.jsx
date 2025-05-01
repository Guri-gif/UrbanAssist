import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const PartnerNavbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => setCollapsed(!collapsed);

  const handleClick = (e) => {
    navigate(`/partnerdashboard/${e.key}`);
  };

  const logout = () => {
    localStorage.removeItem("urbanPartnerToken");
    localStorage.removeItem("urbanPartnerUsername");
    navigate("/");
  };

  const items = [
    { key: "", icon: <AppstoreOutlined />, label: "Dashboard" },
    { key: "bookings", icon: <BookOutlined />, label: "Bookings" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[220px]"
      }`}
    >
      {/* Top Section */}
      <div>
        <div className="flex justify-center items-center py-4">
          <NavLink to="/partnerdashboard">
            <img
              src="/logo.png"
              alt="UrbanPartner"
              className="w-12 h-12 rounded-full"
            />
          </NavLink>
        </div>

        <div
          className="flex justify-center py-2 cursor-pointer text-lg"
          onClick={toggleCollapsed}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>

        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onClick={handleClick}
          defaultSelectedKeys={[""]}
          className="mt-2 border-none"
        />
      </div>

      {/* Logout Section */}
      <div
        onClick={logout}
        className="mb-6 mx-auto flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md shadow cursor-pointer hover:bg-red-700 transition"
      >
        <LogoutOutlined />
        {!collapsed && <span>Logout</span>}
      </div>
    </div>
  );
};

export default PartnerNavbar;
