import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, message } from "antd";

const PartnerBookings = () => {
  const [bookingData, setBookingData] = useState([]);

  const fetchBookingData = useCallback(async () => {
    try {
      const randomNames = ["Alice", "Bob", "Charlie", "Diana", "Ethan", "Fiona", "Gursewak", "Harsh"];
      const services = ["Plumbing", "Electrician", "Cleaning", "Gardening", "Painting"];
      const statuses = ["Pending", "Confirmed", "Completed"];

      const bookings = Array.from({ length: 87 }, (_, i) => ({
        _id: `${i + 1}`,
        customerName: randomNames[Math.floor(Math.random() * randomNames.length)],
        serviceName: services[Math.floor(Math.random() * services.length)],
        date: new Date(Date.now() + i * 86400000).toISOString().split("T")[0],
        status: statuses[Math.floor(Math.random() * statuses.length)],
      }));

      setBookingData(bookings);
    } catch (error) {
      console.error("Error generating mock bookings", error);
      message.error("Failed to generate bookings.");
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
        <Button
          type="primary"
          onClick={() => handleBookingAction(record._id)}
        >
          Complete Booking
        </Button>
      ),
    },
  ];

  const handleBookingAction = async (bookingId) => {
    try {
      const updated = bookingData.map((booking) =>
        booking._id === bookingId ? { ...booking, status: "Completed" } : booking
      );
      setBookingData(updated);
      message.success("Booking status updated!");
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
