import { Button, Table, Tag, Input } from "antd";
import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import api from "../../../api";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Navbar/Navbar";
import Link from "next/link";
import { handleClientScriptLoad } from "next/script";

const Livreur = ({ livreurs }) => {
  const [listLivreur, setListLivreur] = useState(livreurs);
  const allLivreurs = livreurs;

  const [missions, setMissions] = useState([]);
  const [bordereau, setBordereau] = useState([]);
  const [mission, setMission] = useState([]);
  const [missionBordereauList, SetMissionBordereauList] = useState([]);
  /*const [selectedBordereau, setSelectedBordereau] = useState([]);*/

  const [livreurID, setLivreurID] = useState([]);
  const [value, setValue] = useState("");

  const [expandedRows, setExpandedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const modalRef = useRef();

  useEffect(() => {
    console.log("Modal useEffect");
    if ((document && showModal) || (document && showListModal)) {
      // block scroll
      var body = $("html, body");
      body.stop().animate({ scrollTop: 0 }, 500, "swing", function () {
        document.body.style.overflow = "hidden";
      });

      //   scroll to top
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal, showListModal]);

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Mission #",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
        render: (id, record, index) => {
          ++index;
          return index;
        },
        showSorterTooltip: false
      },
      {
        title: "Liste des bordereaux ",
        render: (row) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row"
              }}
            >
              <Button
                type="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  SetMissionBordereauList(
                    missions.filter((m) => {
                      return m._id === row._id;
                    })[0].bordereauList
                  );
                  setMission(
                    missions.filter((m) => {
                      return m._id === row._id;
                    })[0]
                  );
                  setShowListModal(true);
                  setValue("");
                }}
              >
                Afficher
              </Button>
            </div>
          );
        }
      },

      {
        title: "Nombre des bordereaux ",
        key: "nbr-bordereaux",
        render: (row) => {
          return <span>{row.bordereauList.length}</span>;
        }
      },
      {
        title: "Prix totale de Mission",
        key: "prix-mission",
        render: (row) => {
          return (
            <span>
              {row.bordereauList.reduce(
                (total, item) => item.quantite * item.prix_unit + total,
                0
              )}
            </span>
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
      <>
        <div className="mission-title">
          <h5>Missions</h5>{" "}
          <span
            onClick={() => {
              fetchBordereau();
              setShowModal(true);
            }}
          >
            &#43;
          </span>{" "}
        </div>
        <Table
          columns={columns}
          dataSource={missions}
          pagination={{ pageSize: 5 }}
        />
      </>
    );
  };

  missionBordereauList;
  const columns = [
    {
      title: "Nom Livreur",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      missionBordereauList
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

  const handleAddMission = async (livreurId, bordereauList) => {
    try {
      const res = await api.post("/mission/", {
        livreurId,
        bordereauList
      });

      if (res.status === 200) {
        fetchMissions(livreurId);
        setShowModal(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };

  const fetchBordereau = async (id) => {
    const res1 = await api.get(`/bordereau/`);
    const bordereaux = await res1.data;

    setBordereau(
      bordereaux.filter((b) => {
        return !b.livreurID || !b.hasOwnProperty("livreurID");
      })
    );
  };

  /*const fetchMission = async (id) => {
    const res = await api.get(
      `/mission/${id}`
    );
    console.log(res);
    const list = await res.data;

    setMission(list);
  }; */

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
        render: "Livreur a été approuvé",
        type: "success",
        isLoading: false
      });
      const res = await api.get("/users");
      console.log(res);
      toast.update(idLoading, {
        render: "livreur a été approuvé",
        type: "success",
        isLoading: false
      });
      const list = await res.data;
      setListLivreur(
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
        render: "Livreur a été rejeté",
        type: "success",
        isLoading: false
      });

      console.log(res);
      toast.update(idLoading, {
        render: "Livreur a été rejeté",
        type: "success",
        isLoading: false
      });
      const list = await res.data;

      setListLivreur(
        list.map((elem) => {
          return { ...elem, key: elem._id };
        })
      );
      toast.dismiss(idLoading);
    }, 1000);
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

  const fetchMissions = async (id) => {
    const res = await api.get(`/mission/livreur/${id}`);

    console.log(res);
    const list = await res.data;

    setMissions(list);
  };

  const viewcolumns = [
    {
      title: "CodeBar",
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
    }
  ];

  return (
    <Navbar className="form-group">
      <div className="table-actions">
        <Link href="/admin/livreur/add">
          <Button style={{ marginBottom: 50 }}>Ajouter un Livreur</Button>
        </Link>
        <Input
          className="filter-input"
          placeholder="Chercher Livreur"
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = allLivreurs.filter((entry) =>
              entry.name || entry.email
                ? entry.name.includes(currValue) ||
                  entry.email.includes(currValue)
                : false
            );
            if (currValue.length > 0) {
              setListLivreur(filteredData);
            } else {
              setListLivreur(allLivreurs);
            }
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={listLivreur}
        size="large"
        bordered
        pagination={{ pageSize: 5 }}
        loading={livreurs === undefined}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
          rowExpandable: (record) => record.approved
        }}
        onExpand={(expande, record) => {
          fetchMissions(record._id);
          handleRowExpand(record);
          setLivreurID(record._id);
        }}
        expandedRowKeys={expandedRows}
      />
      {showModal && (
        <div>
          <div className={`modal ${showModal && "show"}`}>
            <div className="modal-content-min modal-c" ref={modalRef}>
              <div
                className="modal-header"
                style={{ paddingLeft: "40px", paddingRight: "40px" }}
              >
                <h5 className="modal-title">Liste des bordereaux</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setShowModal();
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(async (data) => {
                    let list = [];
                    for (let i = 0; i < data.bordereauList.length; i++) {
                      list.push(JSON.parse(data.bordereauList[i]));
                    }
                    handleAddMission(livreurID, list);
                  })}
                >
                  <div className="form-group">
                    <select
                      className="form-control select-bordereau"
                      id="exampleInputEmail1"
                      aria-describedby="Selectionner les Bordereau"
                      /*onChange={data => {console.log(data.target.selectedOptions);setSelectedBordereau(data)}}*/
                      {...register("bordereauList", { required: true })}
                      multiple
                    >
                      {bordereau.map((elem) => {
                        return (
                          <>
                            <option value={JSON.stringify(elem)}>
                              [ {elem.codebar} ]{" "}
                              {elem.user ? elem.user.name + " " : " "}{" "}
                              {" => " + elem.nomClient + " | "}{" "}
                              {elem.codebar ? elem.codebar : ""}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button type="submit" className="save-login">
                      Add Mission
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {showListModal && (
        <div>
          <div className={`modal ${showListModal && "show"}`}>
            <div className="modal-content-min modal-c" ref={modalRef}>
              <div
                className="modal-header"
                style={{ paddingLeft: "40px", paddingRight: "40px" }}
              >
                <h5 className="modal-title">Liste des bordereaux</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => {
                    setShowListModal(false);
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <Input
                      placeholder="Chercher Codebar"
                      value={value}
                      onChange={(e) => {
                        const currValue = e.target.value;
                        setValue(currValue);
                        const filteredData = mission.bordereauList.filter(
                          (entry) =>
                            entry.codebar
                              ? entry.codebar.includes(currValue)
                              : false
                        );
                        if (currValue.length > 0) {
                          SetMissionBordereauList(filteredData);
                        } else {
                          SetMissionBordereauList(mission.bordereauList);
                        }
                      }}
                    />
                    <Table
                      columns={viewcolumns}
                      dataSource={missionBordereauList}
                      pagination={false}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Navbar>
  );
};

export const getServerSideProps = async () => {
  const res = await api.get("/users/livreur");
  const res2 = await api.get("/users");

  const list = await res.data;
  const list2 = await res2.data;

  return {
    props: {
      livreurs: list.map((elem) => {
        return { ...elem, key: elem._id };
      })
    }
  };
};
export default Livreur;
