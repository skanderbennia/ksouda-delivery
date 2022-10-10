import { Button, Table, Tag } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import Navbar from "../../../components/Navbar/Navbar";
import Link from "next/link";

const Livreur = ({ livreurs }) => {
  const [listLivreur, setListLivreur] = useState(livreurs);




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
        pagination={{ pageSize: 4 }}
        loading={livreurs === undefined}

      />
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
