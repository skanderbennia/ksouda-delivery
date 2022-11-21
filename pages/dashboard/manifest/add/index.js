import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../../api";
import { userAtom } from "../../../../atoms/userAtom";
import { useRecoilValue } from "recoil";
import Navbar from "../../../../components/Navbar/Navbar";
import { useRouter } from "next/router";
function AddManifest() {
  const router = useRouter();
  const user = useRecoilValue(userAtom);
  const [availableBordereau, setAvailableBordereau] = useState([]);
  const [selectedBordereau, setSelectedBordereau] = useState([]);
  useEffect(() => {
    const id = user.user._id;
    async function fetchData() {
      const noManifestedBordereau = await api.post("/bordereau/noManifest", {
        userId: id
      });
      setAvailableBordereau(noManifestedBordereau.data);
    }
    fetchData();
  }, []);
  const handleSelectedBorderau = async () => {
    try {
      await api.post("/manifest/bordereau", {
        bordereauIds: selectedBordereau.map((elem) => elem._id),
        userId: user.user._id
      });
      router.push("/dashboard/manifest");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(availableBordereau);
  const addcolumns = [
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
    },
    {
      title: "Sélectionner",
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
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                padding: 0
              }}
              onClick={async (e) => {
                e.preventDefault();
                if (selectedBordereau.indexOf(row) === -1) {
                  const indexRow = availableBordereau.findIndex(
                    (elem) => elem._id == row._id
                  );
                  availableBordereau.splice(indexRow, 1);

                  setAvailableBordereau([...availableBordereau]);
                  setSelectedBordereau([...selectedBordereau, row]);
                }
              }}
            >
              +
            </Button>
          </div>
        );
      }
    }
  ];
  const selectcolumns = [
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
    },
    {
      title: "Désélectionner",
      render: (row) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            <Button
              danger
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                padding: 0
              }}
              onClick={async (e) => {
                e.preventDefault();
                var bIndex = selectedBordereau.indexOf(row);
                selectedBordereau.splice(bIndex, 1);
                setSelectedBordereau([...selectedBordereau]);
                setAvailableBordereau([...availableBordereau, row]);
              }}
            >
              -
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Navbar>
      <Table
        dataSource={availableBordereau}
        columns={addcolumns}
        size="small"
        bordered
        pagination={{ pageSize: 3 }}
        loading={false}
      />
      <Table
        dataSource={selectedBordereau}
        columns={selectcolumns}
        size="small"
        bordered
        pagination={{ pageSize: 3 }}
        loading={false}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <Button
          type="default"
          style={{ marginTop: 20 }}
          onClick={async () => {
            await handleSelectedBorderau();
          }}
        >
          Valider
        </Button>
      </div>
    </Navbar>
  );
}

export default AddManifest;
