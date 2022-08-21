import { DownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Menu, Space, Table } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import api from "../../../api";
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

const Bordreau = ({ bordereau }) => {
  const [listBordereau, setListBordereau] = useState(bordereau);
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

    return (
      <Table columns={columns} dataSource={bordereau} pagination={false} />
    );
  };
  const columns = [
    {
      title: "Nom de client",
      dataIndex: "nomClient",
      key: "nomClient",
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse",
    },
    {
      title: "Telephone Client",
      dataIndex: "telClient",
      key: "telClient",
    },
    {
      title: "Quantité",
      dataIndex: "quantite",
      key: "quantite",
    },
    {
      title: "Prix",
      dataIndex: "prix_unit",
      key: "prix_unit",
    },
    {
      title: "Action",
      key: "operation",
      render: (item) => {
        console.log("item", item);

        return (
          <button
            style={{ background: "red", color: "white", border: "none" }}
            onClick={async () => {
              await api.delete("/bordereau/" + item._id);
              setListBordereau(
                listBordereau.filter((elem) => elem._id != item._id)
              );
            }}
          >
            Annuler
          </button>
        );
      },
    },
  ];
  const data = [];

  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      nomClient: "Mohamed Ali",
      adresse: "London No. 1 Lake Park",
      telClient: "22499727",
      quantite: 1,
      prix: "50$",
      createdAt: "2014-12-24 23:12:00",
    });
  }
  console.log(bordereau);
  return (
    <Navbar>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        dataSource={listBordereau}
      />
      <Link href="/dashboard/bordreau/add">
        <Button>Add</Button>
      </Link>
    </Navbar>
  );
};
export const getStaticProps = async () => {
  const res = await api.get("/bordereau");
  return {
    props: {
      bordereau: res.data,
    },
  };
};
export default Bordreau;
