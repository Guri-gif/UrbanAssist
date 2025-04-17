import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const Services = () => {
  const [servicedata, setServiceData] = useState([]);

  const fetchServicedata = useCallback(async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const res = await axios.get(
        `http://localhost:5000/api/auth/serviceData`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const servicesWithKey = res.data.map((service) => ({
        key: service._id,
        serviceName: service.name,
        serviceProviderName: service.serviceProviderName,
        email: service.serviceProviderEmail,
        id: service._id,
        basePrice: service.basePrice,
        serviceType: service.location_type,
        createdAt: new Date(service.createdAt).toLocaleDateString(),
        action: (
          <>
            <DeleteOutlined
              style={{
                color: "red",
                fontSize: 18,
                cursor: "pointer",
                marginRight: 20,
              }}
            />
            <EditOutlined style={{ fontSize: 18, cursor: "pointer" }} />
          </>
        ),
      }));
      setServiceData(servicesWithKey);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  }, []);

  useEffect(() => {
    fetchServicedata();
  }, [fetchServicedata]);

  const columns = [
    {
      title: "Service Name",
      dataIndex: "serviceName",
      key: "serviceName",
    },
    {
      title: "Service Provider Name",
      dataIndex: "serviceProviderName",
      key: "serviceProviderName",
    },
    {
      title: "Service Provider Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "basePrice",
      dataIndex: "basePrice",
      key: "basePrice",
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <>
      <Table dataSource={servicedata} columns={columns} />
    </>
  );
};

export default Services;
