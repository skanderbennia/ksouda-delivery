import { DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Menu, Space, Table } from "antd";
import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Action 1",
      },
      {
        key: "2",
        label: "Action 2",
      },
    ]}
  />
);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Platform",
    dataIndex: "platform",
    key: "platform",
  },
  {
    title: "Version",
    dataIndex: "version",
    key: "version",
  },
  {
    title: "Upgraded",
    dataIndex: "upgradeNum",
    key: "upgradeNum",
  },
  {
    title: "Creator",
    dataIndex: "creator",
    key: "creator",
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Action",
    key: "operation",
    render: () => <a>Publish</a>,
  },
];
const Bordreau = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      {
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
          </Space>
        ),
      },
    ];
    const data = [];

    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }

    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const data = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screem",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  return (
    <Navbar>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={data}
      />
      <Button>Add</Button>
    </Navbar>
  );
};

export default Bordreau;
