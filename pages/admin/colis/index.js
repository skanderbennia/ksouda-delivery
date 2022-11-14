import { Tag, Button, Dropdown, Menu, Space, Table, Input, Badge } from "antd";
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
      const res = await api.get("/bordereau");
      setListBordereau(res.data);
      setAllBordereau(res.data);
    }
    fetchData();
  }, []);
  const [value, setValue] = useState("");
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
  const handleChangeStateBordereau = async (id, etat) => {
    if (["Livre", "Echange", "Annule"].includes(etat)) {
      await api.post("/bordereau", { id, etat });
      const copyBordereaux = await api.get("/bordereau");
      setListBordereau(copyBordereaux.data);
      setAllBordereau(copyBordereaux.data);
    }
  };
  const columns = [
    {
      title: "Code a barre",
      dataIndex: "codebar",
      key: "codebar"
    },
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
            <Button
              style={
                item.etat == "Livre"
                  ? {
                      backgroundColor: "green",
                      color: "white",
                      border: "2px solid black"
                    }
                  : { backgroundColor: "green", color: "white" }
              }
              onClick={async () => {
                await handleChangeStateBordereau(item._id, "Livre");
              }}
            >
              Livré
            </Button>
            <Button
              style={
                item.etat == "Echange"
                  ? {
                      backgroundColor: "orange",
                      color: "white",
                      border: "2px solid black",
                      marginLeft: 20
                    }
                  : {
                      backgroundColor: "orange",
                      color: "white",
                      marginLeft: 20
                    }
              }
              onClick={async () => {
                await handleChangeStateBordereau(item._id, "Echange");
              }}
            >
              Echange
            </Button>
            <Button
              style={
                item.etat == "Annule"
                  ? {
                      backgroundColor: "red",
                      color: "white",
                      border: "2px solid black",
                      marginLeft: 20
                    }
                  : { backgroundColor: "red", color: "white", marginLeft: 20 }
              }
              onClick={async () => {
                await handleChangeStateBordereau(item._id, "Annule");
              }}
            >
              Annulé
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <Navbar>
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
              entry.nomClient || entry.adresse || entry.codebar
                ? entry.nomClient.includes(currValue) ||
                  entry.adresse.includes(currValue) ||
                  entry.codebar.includes(currValue)
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

      <Table
        columns={columns}
        pagination={{ pageSize: 6 }}
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
        dataSource={listBordereau}
      />
      <div
        style={{ display: "flex", justifyContent: "space-around" }}
        className="list-tag-filter"
      >
        <Tag
          color="blue"
          onClick={() => {
            setListBordereau([
              ...allBordereau.filter((elem) => elem.etat === "En cours")
            ]);
          }}
        >
          En cours{" "}
          {allBordereau.filter((elem) => elem.etat === "En cours").length}
        </Tag>
        <Tag
          color="green"
          onClick={() => {
            setListBordereau([
              ...allBordereau.filter((elem) => elem.etat === "Livre")
            ]);
          }}
        >
          Livré {allBordereau.filter((elem) => elem.etat === "Livre").length}
        </Tag>
        <Tag
          color="orange"
          onClick={() => {
            setListBordereau([
              ...allBordereau.filter((elem) => elem.etat === "Echange")
            ]);
          }}
        >
          {" "}
          Echange{" "}
          {allBordereau.filter((elem) => elem.etat === "Echange").length}
        </Tag>
        <Tag
          color="red"
          onClick={() => {
            setListBordereau([
              ...allBordereau.filter((elem) => elem.etat === "Annule")
            ]);
          }}
        >
          Annulé {allBordereau.filter((elem) => elem.etat === "Annule").length}
        </Tag>
        <Tag
          color="purple"
          onClick={() => {
            setListBordereau([...allBordereau]);
          }}
        >
          Totale {allBordereau.length}
        </Tag>
      </div>
    </Navbar>
  );
};

export default Bordreau;
