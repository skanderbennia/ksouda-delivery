import { Button, Table } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import api from "../../../api";
import Navbar from "../../../components/Navbar/Navbar";
import { userAtom } from "../../../atoms/userAtom";
import { manifestAtom } from "../../../atoms/manifestAtom";
import { useRecoilValue, useRecoilState } from "recoil";
function Manifest() {
  const user = useRecoilValue(userAtom);
  const [manifest, setManifest] = useRecoilState(manifestAtom);
  const router = useRouter();
  const [listManifest, setListManifest] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const manifests = await api.post("/manifest", { userId: user.user._id });
      setListManifest(manifests.data);
    }
    fetchData();
  }, []);
  const manifestColumns = [
    {
      title: "Manifest #",
      dataIndex: "_id",
      key: "id",
      sorter: (a, b) => a._id - b._id,
      render: (id, record, index) => {
        ++index;
        return "Manifest n° " + (listManifest.length + 1 - index);
      },
      showSorterTooltip: false
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
              onClick={async () => {
                try {
                  const bordereaus = await api.post("/bordereau/manifest/", {
                    manifestId: row._id
                  });
                  setManifest({ bordereaus: bordereaus.data });
                  router.push("/manifeste");
                } catch (err) {
                  // error
                }
              }}
            >
              Imprimer
            </Button>
          </div>
        );
      }
    }
  ];
  return (
    <Navbar>
      <Button
        type="default"
        onClick={() => {
          router.push("/dashboard/manifest/add");
        }}
        style={{ marginBottom: 30 }}
      >
        Créer Manifest
      </Button>
      <Table dataSource={listManifest} columns={manifestColumns} bordered />
    </Navbar>
  );
}

export default Manifest;
