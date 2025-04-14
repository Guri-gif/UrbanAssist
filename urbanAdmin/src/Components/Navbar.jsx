import { useState } from "react";
import { Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  BookOutlined,
  SmileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  
  const navi = useNavigate();
  const logout = async () => {
    localStorage.removeItem("adminToken");
    navi("/");
  };

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      key: "/mainpage/services",
      icon: <AppstoreOutlined />,
      label: "Services",
    },
    {
      key: "/mainpage/bookings",
      icon: <BookOutlined />,
      label: "Bookings",
    },
    {
      key: "/mainpage/users",
      icon: <SmileOutlined />,
      label: "users",
    },
  ];

  const handleClick = (e) => {
    navigate(e.key);
  };

  return (
    <div style={{ width: collapsed ? 80 : 200 }}>
      <div className="w-[80px] h-[80px] p-4">
        <img src="/src/assets/logo.png" alt="" className="rounded-lg" />
      </div>
      <div className="p-2 cursor-pointer text-lg" onClick={toggleCollapsed}>
        {collapsed ? (
          <MenuUnfoldOutlined
            style={{ display: "flex", justifyContent: "center" }}
          />
        ) : (
          <MenuFoldOutlined
            style={{
              display: "flex",
              justifyContent: "start",
              marginLeft: "20px",
            }}
          />
        )}
      </div>
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleClick}
        defaultSelectedKeys={["/users"]}
      />
      <div
        onClick={logout}
        className="fixed bottom-[50px] flex justify-evenly items-center border w-[100px] bg-red-600 p-2 rounded-lg text-white cursor-pointer"
      >
        <button>Logout</button>
        <LogoutOutlined />
      </div>
    </div>
  );
};

export default Navbar;
