import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table, Button, message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/auth/bookingData");
      const realBookings = response.data || [];
      
      // Add mock data if needed (optional)
      const randomBookings = Array.from({ length: 5 }, (_, i) => ({
        _id: `mock-${i}`,
        customerName: `Customer ${i+1}`,
        serviceName: ['Plumbing', 'Cleaning', 'Repair'][Math.floor(Math.random()*3)],
        date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
        status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random()*3)],
      }));

      setBookingData([...realBookings, ...randomBookings]);
    } catch (error) {
      console.error("Error fetching booking data", error);
      message.error("Failed to fetch booking data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/booking/${bookingId}`);
      setBookingData(bookingData.filter(booking => booking._id !== bookingId));
      message.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking", error);
      message.error("Failed to delete booking");
    }
  };

  const handleEdit = (bookingId) => {
    // Placeholder for edit functionality
    message.info(`Edit booking with ID: ${bookingId}`);
  };

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Service',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record._id)}
            style={{ marginRight: 8 }}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Table 
        dataSource={bookingData}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Bookings;