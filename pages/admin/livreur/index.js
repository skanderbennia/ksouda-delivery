import { Button, Table, Tag } from "antd";
import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import api from "../../../api";
import Navbar from "../../../components/Navbar/Navbar";
import Link from "next/link";

const Livreur = ({ livreurs }) => {
  const [listLivreur, setListLivreur] = useState(livreurs);
  const [missions, setMissions] = useState([{bordereauList:[{quantite:5,prix_unit:50},{quantite:2,prix_unit:4},{quantite:1,prix_unit:200}]},{bordereauList:[{quantite:20,prix_unit:7},{quantite:4,prix_unit:65},{quantite:4,prix_unit:1},{quantite:1,prix_unit:10},{quantite:2,prix_unit:300}]}]);
  const [bordereau, setBordereau] = useState([]);

  const [expandedRows, setExpandedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);


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
  }, [showModal,showListModal]);

  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Mission #',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        render: (id, record, index) => { ++index; return index; },
        showSorterTooltip: false,
        
        
    },
      {
        title: "Liste des bordereaux ",
        render: (row) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
                <Button
                  type="primary"
                  onClick={async (e) => {
                    e.preventDefault();
                    setShowListModal(true);
                  }}
                >
                  Afficher 
                </Button>
            </div>
          );
        },
      },
      
      {
        title: "Nombre des bordereaux ",
        key: 'nbr-bordereaux',
        render: (row) => {
          return (
            <span>
            {row.bordereauList.length}
            </span>
          );
        },
      },
      {
        title: "Prix totale de Mission",
        key: 'prix-mission',
        render: (row) => {
          return (
            <span>
            {row.bordereauList.reduce((total, item) => (item.quantite*item.prix_unit) + total, 0)}
            </span>
          );
        },
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
      <>
        <div className="mission-title"><h5>Missions</h5> <span onClick={()=>{
          fetchBordereau();
          setShowModal(true);
          }}>&#43;</span> </div>
        <Table
          columns={columns}
          dataSource={missions}
          pagination={{ pageSize: 5 }}
        />
      </>
    );
  };


  const columns = [
    {
      title: "Nom Livreur",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
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
      },
    },
    {
      title: "Action",
      render: (row) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
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
      },
    },
  ];

  const fetchBordereau = async (id) => {
    const res = await fetch(
      `http://localhost:3000/api/bordereau/`
    );
    console.log(res);
    const list = await res.json();

    setBordereau(list);
  }; 

  const approveUser = async (id) => {
    toast.promise(api.get("/users/approve/" + id), {
      success: "Livreur approuver",
      error: "Livreur déja approuver",
      loading: "Lancement de transaction ...",
    });

    setTimeout(async () => {
      const res = await fetch("http://localhost:3000/api/users/livreur");
      console.log(res);
      const list = await res.json();
      setListLivreur(
        list.map((elem) => {
          return { ...elem, key: elem._id };
        })
      );
    }, 500);
  };

  const blockUser = async (id) => {
    await toast.promise(api.get("/users/reject/" + id), {
      success: "Livreur bloquee",
      error: "Livreur déja non approvee",
      loading: "Lancement de transaction ...",
    });

    setTimeout(async () => {
      const res = await fetch("http://localhost:3000/api/users/livreur");
      console.log(res);
      const list = await res.json();
      setListLivreur(
        list.map((elem) => {
          return { ...elem, key: elem._id };
        })
      );
    }, 500);
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
    /*const res = await fetch(
      `http://localhost:3000/api/livreur/missions/${id}`
    );
    console.log(res);
    const list = await res.json();

    setMissions(list);*/
  };


  return (
    <Navbar>
      <Link href="/admin/livreur/add">
        <Button style={{ marginBottom: 50 }}>Ajouter un Livreur</Button>
      </Link>
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
          rowExpandable: (record) => record.approved ,
        }}
        onExpand={(expande, record) => {
          fetchMissions(record._id);
          handleRowExpand(record);
        }}
        expandedRowKeys={expandedRows}

      />
      {showModal && 
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
                      setShowModal(false);
                    }}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                  
                  >
                    <div className="form-group">
                      <select
                        className="form-control select-bordereau"
                        id="exampleInputEmail1"
                        aria-describedby="Selectionner les Bordereau"
                        multiple
                      >
                          {bordereau.map((elem) => {
                            return ( <>
                                      <option value={elem}>[{elem.adresse}] {elem.nomClient}</option>
                                    </> );
                          })
                           }
                      </select>
                    </div>
                    <div                   
                    style={{ display: "flex", justifyContent: "flex-end" }}>
                      <button
                        type="submit"
                        className="save-login"
                      >
                        Add Mission
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

        </div>
      }
      {showListModal && 
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
                  <form
                  
                  >
                    <div className="form-group">
                      <select
                        className="form-control select-bordereau"
                        id="exampleInputEmail1"
                        aria-describedby="Selectionner les Bordereau"
                        multiple
                      >
                          {bordereau.map((elem) => {
                            return ( <>
                                      <option value={elem}>[{elem.adresse}] {elem.nomClient}</option>
                                    </> );
                          })
                           }
                      </select>
                    </div>
                  </form>
                </div>
              </div>
            </div>

        </div>
      }
    </Navbar>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/users/livreur");
  const list = await res.json();

  return {
    props: {
      livreurs: list.map((elem) => {
        return { ...elem, key: elem._id };
      }),
    },
  };
};
export default Livreur;
