import { Tag, Button, Dropdown, Menu, Space, Table, Input, Badge } from "antd";
import BreadcrumbSeparator from "antd/lib/breadcrumb/BreadcrumbSeparator";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import api from "../../../api";
import { extraitAtom } from "../../../atoms/extraitAtom";
import { userAtom } from "../../../atoms/userAtom";
import Navbar from "../../../components/Navbar/Navbar";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Action 1"
      },
      {
        key: "2",
        label: "Action 2"
      }
    ]}
  />
);

const Bordreau = ({ bordereau }) => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const [extrait, setExtrait] = useRecoilState(extraitAtom);
  const [listBordereau, setListBordereau] = useState([]);
  const [allBordereau, setAllBordereau] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let ID = user.user._id;
      const res = await api.post("/bordereau/expediteur/", { id: ID });
      setListBordereau(res.data);
      setAllBordereau(res.data);
    }
    fetchData();
  }, []);

  const [value, setValue] = useState("");
  console.log(listBordereau);
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        )
      },
      {
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        key: "upgradeNum"
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
        )
      }
    ];
    const data = [];

    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56"
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
      key: "nomClient"
    },
    {
      title: "Adresse",
      dataIndex: "adresse",
      key: "adresse"
    },
    {
      title: "Telephone Client",
      dataIndex: "telClient",
      key: "telClient"
    },
    {
      title: "Quantité",
      dataIndex: "quantite",
      key: "quantite"
    },
    {
      title: "Prix",
      dataIndex: "prix_unit",
      key: "prix_unit"
    },
    {
      title: "Prix de livraison",
      key: "prix_livraison",
      render: () => {
        return <p style={{ textAlign: "center" }}>7dt </p>;
      }
    },
    {
      title: "Prix totale",
      key: "prix_totale",
      render: (item) => {
        return (
          <p style={{ textAlign: "center" }}>
            {item.quantite * item.prix_unit} dt{" "}
          </p>
        );
      }
    },
    {
      title: "Etat",
      // dataIndex: "etat",
      key: "etat",
      render: (item) => {
        switch (item.etat) {
          case "En cours":
            return <Tag color="blue">{item.etat}</Tag>;

          case "Annule":
            return <Tag color="red">{item.etat}</Tag>;

          case "Livre":
            return <Tag color="green">{item.etat}</Tag>;
          case "Echange":
            return <Tag color="orange">{item.etat}</Tag>;
        }
      }
    },
    {
      title: "Action",
      key: "operation",
      render: (item) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <button
              style={{ background: "red", color: "white", border: "none" }}
              onClick={async () => {
                let ID = item._id;
                await api.patch("/bordereau/", { id: ID });
                setListBordereau(
                  listBordereau.filter((elem) => elem._id != item._id)
                );
              }}
            >
              Annuler
            </button>
            <button
              style={{
                background: "black",
                color: "white",
                border: "none",
                marginLeft: 20
              }}
              onClick={() => {
                setExtrait({
                  ...extrait,
                  nomClient: item.nomClient,
                  codebar: item.codebar,
                  adresse: item.adresse,
                  telClient: item.telClient,
                  prix_unit: item.prix_unit,
                  quantite: item.quantite,
                  contenu: item.contenu,
                  expediteur: user.user,
                  bordereauNumber: item.indexElement
                });
                router.push("/extrait");
              }}
            >
              Imprimer
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <Navbar>
      <div className="table-actions">
        <Link href="/dashboard/bordereau/add">
          <Button style={{ marginBottom: 50 }}>Ajouter un bordereau</Button>
        </Link>
        <Input
          className="filter-input"
          placeholder="Chercher Bordreau"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            let filteredData = [];
            if (allBordereau) {
              filteredData = allBordereau.filter((entry) =>
                entry.nomClient || entry.adresse
                  ? entry.nomClient.includes(currValue) ||
                    entry.adresse.includes(currValue)
                  : false
              );
            }
            console.log(filteredData);
            if (currValue.length > 0) {
              setListBordereau(filteredData);
            } else {
              setListBordereau(allBordereau);
            }
          }}
        />
      </div>
      <Table
        columns={columns}
        pagination={{ pageSize: 6 }}
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
        dataSource={listBordereau}
      />
    </Navbar>
  );
};

export default Bordreau;
