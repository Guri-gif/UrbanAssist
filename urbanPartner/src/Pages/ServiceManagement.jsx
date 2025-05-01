import React, { useState, useEffect, useCallback } from "react";
import { Table, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const ServiceManagement = () => {
  const [serviceData, setServiceData] = useState([]);

  const fetchServiceData = useCallback(async () => {
    try {
      const partnerToken = localStorage.getItem("partnerToken");
      const res = await axios.get(
        "http://localhost:5000/api/partner/services", // Assuming the partner API endpoint for services
        {
          headers: { Authorization: `Bearer ${partnerToken}` },
        }
      );
      setServiceData(res.data);
    } catch (error) {
      console.error("Error fetching services", error);
      message.error("Failed to fetch services");
    }
  }, []);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);

  const columns = [
    { title: "Service Name", dataIndex: "name", key: "name" },
    { title: "Provider Name", dataIndex: "serviceProviderName", key: "serviceProviderName" },
    { title: "Base Price", dataIndex: "basePrice", key: "basePrice" },
    { title: "Service Type", dataIndex: "serviceType", key: "serviceType" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <EditOutlined style={{ marginRight: 20, cursor: "pointer" }} />
          <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
        </>
      ),
    },
  ];

  return <Table dataSource={serviceData} columns={columns} />;
};

export default ServiceManagement;
