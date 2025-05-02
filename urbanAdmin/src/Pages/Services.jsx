import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  message,
} from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const { Option } = Select;

const Services = () => {
  const [servicedata, setServiceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchServicedata = useCallback(async () => {
    setLoading(true);
    try {
      const adminToken = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:5000/api/auth/serviceData",
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
            "Under Construction"
            {/* <DeleteOutlined
              style={{
                color: "red",
                fontSize: 18,
                cursor: "pointer",
                marginRight: 20,
              }}
              onClick={() => handleDelete(service._id)}
            />
            <EditOutlined
              style={{ fontSize: 18, cursor: "pointer" }}
              onClick={() => handleEdit(service._id)}
            /> */}
          </>
        ),
      }));
      setServiceData(servicesWithKey);
    } catch (error) {
      console.error("Error fetching services:", error);
      message.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServicedata();
  }, [fetchServicedata]);

  const handleCreateService = async () => {
    try {
      const values = await form.validateFields();
      const adminToken = localStorage.getItem("adminToken");

      await axios.post("http://localhost:5000/api/auth/createService", values, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      message.success("Service created successfully");
      form.resetFields();
      setModalVisible(false);
      fetchServicedata();
    } catch (error) {
      console.error("Error creating service:", error);
      message.error(
        error.response?.data?.message || "Failed to create service"
      );
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const adminToken = localStorage.getItem("adminToken");
  //     await axios.delete(`http://localhost:5000/api/auth/service/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${adminToken}`,
  //       },
  //     });
  //     message.success("Service deleted successfully");
  //     fetchServicedata();
  //   } catch (error) {
  //     console.error("Error deleting service:", error);
  //     message.error("Failed to delete service");
  //   }
  // };

  // const handleEdit = (id) => {
  //   // Implement edit functionality here
  //   message.info(`Edit service with ID: ${id}`);
  // };

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
      title: "Base Price",
      dataIndex: "basePrice",
      key: "basePrice",
      render: (price) => `$${price}`,
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      render: (type) => {
        const typeMap = {
          at_home: "At Home",
          at_site: "On Site",
          home: "At Home", // Backward compatibility
          onsite: "On Site", // Backward compatibility
        };
        return typeMap[type] || type;
      },
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
    <div style={{ padding: 24 }}>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Add Service
        </Button>
      </div>

      <Table
        dataSource={servicedata}
        columns={columns}
        loading={loading}
        bordered
      />

      <Modal
        title="Create New Service"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateService}>
            Create
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Service Name"
            rules={[{ required: true, message: "Please enter service name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="serviceProviderName"
            label="Service Provider Name"
            rules={[{ required: true, message: "Please enter provider name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="serviceProviderEmail"
            label="Service Provider Email"
            rules={[
              { required: true, message: "Please enter provider email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="basePrice"
            label="Base Price"
            rules={[{ required: true, message: "Please enter base price" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="location_type"
            label="Service Type"
            rules={[{ required: true, message: "Please select service type" }]}
          >
            <Select placeholder="Select service type">
              <Option value="at_home">At Home Service</Option>
              <Option value="at_site">On Site Service</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Services;
