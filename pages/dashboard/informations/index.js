import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../../atoms/userAtom";
import api from "../../../api";
export default function Informations() {
  const [listBordereau, setListBordereau] = useState([]);
  const user = useRecoilValue(userAtom);
  React.useEffect(() => {
    async function fetchData() {
      let ID = user.user._id;
      const res = await api.post("/bordereau/expediteur/", { id: ID });
      setListBordereau(res.data);
    }
    fetchData();
  }, []);
  function montantTotal(arr) {
    return arr
      .filter((elem) => elem.etat === "Livre")
      .map((elem) => elem.quantite * elem.prix_unit)
      .reduce((accumulator, currentValue) => {
        accumulator = accumulator + currentValue;
        return accumulator;
      }, 0);
  }
  function montantFrais(arr) {
    return arr
      .filter((elem) => elem.etat === "Livre")
      .reduce((accumulator) => {
        accumulator = accumulator + 7;
        return accumulator;
      }, 0);
  }

  return (
    <Navbar>
      <div className="ks-container">
        <h3>Détail</h3>
        <div className="stat-group">
          <div className="stat-container ">
            <div className="bg-green">
              <h2>{montantTotal(listBordereau)} DT</h2>
            </div>
            <h4>Montant accumulé </h4>
          </div>
          <h1> - </h1>
          <div className="stat-container ">
            <div className="bg-red">
              <h2>{montantFrais(listBordereau)} DT</h2>
            </div>
            <h4>Montant depensé sur les frais</h4>
          </div>
          <h1> = </h1>
          <div className="stat-container ">
            <div className="bg-purple">
              <h2>
                {montantTotal(listBordereau) - montantFrais(listBordereau)} DT
              </h2>
            </div>
            <h4>Les bénéfices</h4>
          </div>
        </div>
      </div>
    </Navbar>
  );
}
