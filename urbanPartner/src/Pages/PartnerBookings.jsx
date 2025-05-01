import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message } from "antd";
import axios from "axios";

const PartnerBookings = ({ serviceProviderId, updateTotalBookings }) => {
  const [bookingData, setBookingData] = useState([]);

  const fetchBookingData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/bookingData");
      const realBookings = response.data || [];

      const randomNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "Gursewak", "Harsh"];
      const services = ["Plumbing", "Electrician", "Cleaning", "Gardening", "Painting"];
      const statuses = ["pending", "accepted", "rejected"];

      const randomBookings = Array.from({ length: 86 }, (_, i) => {
        return {
          _id: `random-${i + 1}`,
          customerName: randomNames[Math.floor(Math.random() * randomNames.length)],
          serviceName: services[Math.floor(Math.random() * services.length)],
          date: new Date(Date.now() + i * 86400000).toISOString().split("T")[0],
          status: statuses[Math.floor(Math.random() * statuses.length)],
        };
      });

      const combinedBookings = [...realBookings, ...randomBookings];

      setBookingData(combinedBookings);
    } catch (error) {
      console.error("Error fetching booking data", error);
      message.error("Failed to fetch booking data.");
    }
  }, []);

  useEffect(() => {
    fetchBookingData();
  }, [fetchBookingData]);

  const columns = [
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "Service", dataIndex: "serviceName", key: "serviceName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleBookingAction(record._id, "accepted")}
            disabled={record.status !== "pending"}
          >
            Accept Booking
          </Button>
          <Button
            type="danger"
            onClick={() => handleBookingAction(record._id, "rejected")}
            disabled={record.status !== "pending"}
            className="ml-2"
          >
            Reject Booking
          </Button>
        </div>
      ),
    },
  ];

  const handleBookingAction = async (bookingId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/booking/${bookingId}/status`,
        { status, serviceProviderId }
      );

      if (response.data.message) {
        const updated = bookingData.map((booking) =>
          booking._id === bookingId ? { ...booking, status } : booking
        );
        setBookingData(updated);

        // Update the booking count on the PartnerDashboard
        updateTotalBookings(status === "accepted" ? "add" : "remove");

        message.success(`Booking has been ${status}`);
      } else {
        message.error("Failed to update booking status.");
      }
    } catch (error) {
      console.error("Error updating booking status", error);
      message.error("Failed to update booking status.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-semibold">Partner Bookings</h2>
      <Table dataSource={bookingData} columns={columns} rowKey="_id" />
    </div>
  );
};

export default PartnerBookings;
