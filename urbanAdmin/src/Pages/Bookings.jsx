import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import React from 'react'

const Bookings = () => {
    const deleteButton = () => {
        return (
          <DeleteOutlined
            style={{ color: "red", fontSize: 18, cursor: "pointer", marginRight: 20 }}
          />
        );
      };
    
      const editButton = () => {
        return (
          <EditOutlined style={{ fontSize: 18, cursor: "pointer" }} />
        );
      };
      const dataSource = [
        {
          key: "1",
          name: "Mike",
          age: 32,
          address: "10 Downing Street",
          action: [deleteButton(), editButton()],
        },
        {
          key: "2",
          name: "John",
          age: 42,
          address: "10 Downing Street",
          action: [deleteButton(), editButton()],
        },
      ];
    
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Age",
          dataIndex: "age",
          key: "age",
        },
        {
          title: "Address",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ];
    
      return (
        <>
          <Table dataSource={dataSource} columns={columns} />
        </>
      );
}

export default Bookings
