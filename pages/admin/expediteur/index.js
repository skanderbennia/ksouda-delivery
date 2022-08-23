import { Button, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../api";
import Navbar from "../../../components/Navbar/Navbar";

const Expediteur = ({ expediteurs }) => {
  const [listExpediteur, setListExpediteur] = useState(expediteurs);
  const columns = [
    {
      title: "Nom Expediteur",
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
      title: "Action",
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
              onClick={async () => {
                await approveUser(row._id);
              }}
            >
              Approver
            </Button>
            <Button danger style={{ marginLeft: 20 }}>
              Bloquer
            </Button>
          </div>
        );
      },
    },
  ];
  const approveUser = async (id) => {
    setListExpediteur(listExpediteur.filter((elem) => elem._id != id));
    toast.promise(api.get("/users/approve/" + id), {
      success: "Expediteur approuver",
      error: "Expediteur déja approuver",
      loading: "Lancement de transaction ...",
    });
  };
  return (
    <Navbar>
      <Table
        columns={columns}
        dataSource={listExpediteur.map((elem) => {
          return { ...elem, key: elem._id };
        })}
        size="large"
        bordered
        loading={expediteurs === undefined}
      />
    </Navbar>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  console.log(res);
  const list = await res.json();
  return {
    props: {
      expediteurs: list,
    },
  };
};
export default Expediteur;
