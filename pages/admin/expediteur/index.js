import { Button, Table, Input, Tag } from "antd";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { extraitAtom } from "../../../atoms/extraitAtom";
import { useForm } from "react-hook-form";
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
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const modalRef = useRef();

  const payoutHandler = async (id) => {
    try {
      setLoading(true);
      await api.put("/bordereau/expediteur/payout", { idExpediteur: id });
      let res = await api.get("/users");
      let newListExpediteur = res.data;
      newListExpediteur = newListExpediteur.map((elem) => {
        return {
          ...elem,
          key: elem._id
        };
      });
      const newListBordereau = await api.post(`/bordereau/expediteur/`, { id });

      console.log(
        "🚀 ~ file: index.js ~ line 48 ~ payoutHandler ~ newListBordereau.data",
        newListBordereau.data
      );
      console.log(
        "🚀 ~ file: index.js ~ line 46 ~ payoutHandler ~ newListExpediteur",
        newListExpediteur
      );
      setListExpediteur(newListExpediteur);
      setBordereau(newListBordereau.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

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
        title: "Etat",
        // dataIndex: "etat",
        key: "etat",
        render: (item) => {
          switch (item.etat) {
            case "En cours":
              return <Tag color="orange">{item.etat}</Tag>;

            case "Annule":
              return <Tag color="red">{item.etat}</Tag>;

            case "Livre":
              return <Tag color="green">{item.etat}</Tag>;
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
        console.log(
          "🚀 ~ file: index.js ~ line 206 ~ Expediteur ~ payout",
          row
        );

        return (
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            {row.approved ? (
              <Tag color="green">Approuvé</Tag>
            ) : (
              <Tag color="yellow">En Attente</Tag>
            )}
            {row.payout ? (
              <Tag color="purple"> Payé</Tag>
            ) : (
              <Tag color="grey">No payé</Tag>
            )}
          </div>
        );
      }
    },
    {
      title: "Matricule Fiscal",
      key: "matriculeFiscal",
      render: (row) => {
        console.log(row);
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            {row.matriculeFiscal ? (
              <span>{row.matriculeFiscal}</span>
            ) : (
              <Button
                type="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  setShowModal(true);
                  setSelectedId(row._id);
                }}
              >
                Ajouter Matricule Fiscal
              </Button>
            )}
          </div>
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
              flexDirection: "row",
              gap: 10
            }}
          >
            <Button
              type="default"
              onClick={async () => {
                await payoutHandler(row._id);
              }}
            >
              Payout
            </Button>
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

  const handleAddMatricule = async (id, matricule) => {
    const idLoading = toast.loading("Chargement de la transaction ....", {
      isLoading: true
    });

    await api.post("/users/addMatFisc", {
      id,
      matricule
    });
    setTimeout(() => {
      toast.update(idLoading, {
        render: "pending...",
        type: "loading",
        isLoading: true
      });
    }, 1000);

    setTimeout(async () => {
      toast.update(idLoading, {
        render: "Matricule a été ajouté",
        type: "success",
        isLoading: false
      });
      const res = await api.get("/users");
      toast.update(idLoading, {
        render: "Matricule a été ajouté",
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
        <div>
          <label style={{ marginRight: 50 }}>Prix de livraison</label>
          <Input
            className="filter-input"
            placeholder="Fixer le prix de livraison "
            type="number"
            defaultValue={7}
          />
        </div>

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
      {showModal && (
        <div>
          <div className={`modal ${showModal && "show"}`}>
            <div
              className="modal-content-min modal-c modal-matfisc"
              ref={modalRef}
            >
              <div className="modal-header">
                <h5 className="modal-title">Ajouter le matricule fiscal</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(async (data) => {
                    await handleAddMatricule(selectedId, data.mat);
                    setShowModal(false);
                  })}
                >
                  <div style={{ display: "block" }} className="input-container">
                    <label> Matricule Fiscale </label>
                    <input
                      className="input-add-bordreau"
                      name="mat"
                      {...register("mat", { required: true })}
                    />
                    {errors.mat && errors.mat.type === "required" ? (
                      <span className="error">
                        Veuillez remplir le champ matricule{" "}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="save-login">
                      Ajouter Matricule
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
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
