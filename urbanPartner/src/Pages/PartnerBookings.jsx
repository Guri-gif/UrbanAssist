import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const PartnerBookings = ({ updateTotalBookings }) => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookingData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("urbanPartnerToken");

      if (!token) {
        message.error("Please login first");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/auth/bookingData",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const realBookings = response.data || [];
      setBookingData(
        realBookings.length > 0 ? realBookings : generateMockData()
      );
    } catch (error) {
      if (error.response?.status === 401) {
        message.error("Session expired. Please login again.");
        // Consider redirecting to login:
        // window.location.href = '/partner-login';
      }
      setBookingData(generateMockData());
    } finally {
      setLoading(false);
    }
  }, []);

  const generateMockData = () => {
    const randomNames = [
      "Alice",
      "Bob",
      "Charlie",
      "Diana",
      "Ethan",
      "Fiona",
      "Gursewak",
      "Harsh",
    ];
    const services = [
      "Plumbing",
      "Electrician",
      "Cleaning",
      "Gardening",
      "Painting",
    ];
    const statuses = ["pending", "accepted", "rejected"];

    return Array.from({ length: 8 }, (_, i) => ({
      _id: `mock-${i + 1}`,
      customerName: randomNames[Math.floor(Math.random() * randomNames.length)],
      serviceName: services[Math.floor(Math.random() * services.length)],
      date: new Date(Date.now() + i * 86400000).toISOString().split("T")[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };

  useEffect(() => {
    fetchBookingData();
  }, [fetchBookingData]);

  const handleBookingAction = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("urbanPartnerToken");
      const partnerId = localStorage.getItem("partnerId");

      if (!token || !partnerId) {
        message.error("Please login first");
        return;
      }

      if (bookingId.startsWith("mock-")) {
        const updated = bookingData.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        );
        setBookingData(updated);
        updateTotalBookings(status === "accepted" ? "add" : "remove");
        message.success(`Mock booking ${status}`);
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/auth/booking/${bookingId}/status`,
        {
          status,
          serviceProviderId: partnerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        await fetchBookingData();
        message.success(`Booking ${status} successfully`);
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to update booking status. Please try again."
      );
    }
  };

  const columns = [
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Service", dataIndex: "serviceName", key: "serviceName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleBookingAction(record._id, "accepted")}
            disabled={record.status !== "pending"}
          >
            Accept
          </Button>
          <Button
            danger
            onClick={() => handleBookingAction(record._id, "rejected")}
            disabled={record.status !== "pending"}
            style={{ marginLeft: 8 }}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">Bookings</h2>
      <Table
        dataSource={bookingData}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PartnerBookings;
