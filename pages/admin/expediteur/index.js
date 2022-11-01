import { Button, Table, Input, Tag } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { extraitAtom } from "../../../atoms/extraitAtom";
import api from "../../../api";
import Navbar from "../../../components/Navbar/Navbar";

const Expediteur = ({ expediteurs }) => {
  const router = useRouter();
  const [listExpediteur, setListExpediteur] = useState(expediteurs);
  const allExpediteurs = expediteurs;
  const [bordereau, setBordereau] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [extrait, setExtrait] = useRecoilState(extraitAtom);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleRowExpand = (record) => {
    // if a row is expanded, collapses it, otherwise expands it

    if (expandedRows.includes(record.key)) {
      const row = expandedRows.filter((key) => key !== record.key);
      setExpandedRows(row);
    } else {
      setExpandedRows([record.key]);
    }
  };
  const expandedRowRender = () => {
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
                  setBordereau(
                    bordereau.filter((elem) => elem._id != item._id)
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
                    ...item
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
      <Table
        columns={columns}
        dataSource={bordereau}
        loading={loading}
        pagination={{ pageSize: 3 }}
      />
    );
  };

  const columns = [
    {
      title: "Nom Expediteur",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Status",
      key: "state",
      render: (row) => {
        return row.approved ? (
          <Tag color="green">Approuvé</Tag>
        ) : (
          <Tag color="yellow">En Attente</Tag>
        );
      }
    },
    {
      title: "Action",
      render: (row) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            {!row.approved && (
              <Button
                type="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  await approveUser(row._id);
                }}
              >
                Approver
              </Button>
            )}
            {row.approved && (
              <Button
                danger
                onClick={async (e) => {
                  e.preventDefault();
                  await blockUser(row._id);
                }}
              >
                Bloquer
              </Button>
            )}
          </div>
        );
      }
    }
  ];

  const fetchBordereau = async (id) => {
    setLoading(true);
    const res = await api.post(`/bordereau/expediteur/`, { id });
    const list = await res.data;

    setBordereau(list);
    setLoading(false);
  };

  const approveUser = async (id) => {
    const idLoading = toast.loading("Chargement de la transaction ....", {
      isLoading: true
    });

    await api.post("/users/approve/", { id });
    setTimeout(() => {
      toast.update(idLoading, {
        render: "pending...",
        type: "loading",
        isLoading: true
      });
    }, 1000);

    setTimeout(async () => {
      toast.update(idLoading, {
        render: "Expediteur a été approuvé",
        type: "success",
        isLoading: false
      });
      const res = await api.get("/users");
      toast.update(idLoading, {
        render: "Expediteur a été approuvé",
        type: "success",
        isLoading: false
      });
      const list = await res.data;
      setListExpediteur(
        list.map((elem) => {
          return { ...elem, key: elem._id };
        })
      );
      toast.dismiss(idLoading);
    }, 1000);
  };

  const blockUser = async (id) => {
    const idLoading = toast.loading("Chargement de la transaction ....", {
      isLoading: true
    });

    await api.post("/users/reject/", { id });
    setTimeout(() => {
      toast.update(idLoading, {
        render: "pending...",
        type: "loading",
        isLoading: true
      });
    }, 1000);

    setTimeout(async () => {
      const res = await api.get("/users");

      toast.update(idLoading, {
        render: "Expediteur a été rejeté",
        type: "success",
        isLoading: false
      });

      toast.update(idLoading, {
        render: "Expediteur a été rejeté",
        type: "success",
        isLoading: false
      });
      const list = await res.data;

      setListExpediteur(
        list.map((elem) => {
          return { ...elem, key: elem._id };
        })
      );
      toast.dismiss(idLoading);
    }, 1000);
  };

  return (
    <Navbar>
      <div className="table-actions exp">
        <Input
          className="filter-input"
          placeholder="Chercher Expediteur"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = allExpediteurs.filter((entry) =>
              entry.name || entry.email
                ? entry.name.includes(currValue) ||
                  entry.email.includes(currValue)
                : false
            );
            if (currValue.length > 0) {
              setListExpediteur(filteredData);
            } else {
              setListExpediteur(allExpediteurs);
            }
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={listExpediteur}
        size="large"
        bordered
        pagination={{ pageSize: 4 }}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
          loading: loading
        }}
        onExpand={(expande, record) => {
          fetchBordereau(record._id);
          handleRowExpand(record);
        }}
        // tell the 'Table' component which rows are expanded
        expandedRowKeys={expandedRows}
      />
    </Navbar>
  );
};

export const getServerSideProps = async () => {
  const res = await api.get("/users");
  const list = await res.data;

  return {
    props: {
      expediteurs: list.map((elem) => {
        return { ...elem, key: elem._id };
      })
    }
  };
};
export default Expediteur;
