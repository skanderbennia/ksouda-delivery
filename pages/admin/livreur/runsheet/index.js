import React from "react";
import { useRecoilValue } from "recoil";
import { missionAtom } from "../../../../atoms/missionAtom";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { Button } from "antd";
const pagesStyle = `@media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }
  
  @page {
    size: auto;
    margin: 20mm;
  }`;
export default function Runsheet() {
  const runsheetRow = useRecoilValue(missionAtom);
  const runsheetRef = useRef();
  return (
    <div
      ref={runsheetRef}
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <table border={1}>
        <tr>
          <th>CodeBar</th>
          <th>Nom de client</th>
          <th>Adresse</th>
          <th>Telephone de Client</th>
          <th>Quantité</th>
          <th>Prix</th>
        </tr>

        {runsheetRow.bordereauList.map((elem) => {
          return (
            <tr>
              <td>{elem.codebar}</td>
              <td>{elem.nomClient}</td>
              <td>{elem.adresse}</td>
              <td>{elem.telClient}</td>
              <td>{elem.quantite}</td>
              <td>{elem.prix_unit}</td>
            </tr>
          );
        })}
      </table>
      <ReactToPrint
        pageStyle={pagesStyle}
        content={() => runsheetRef}
        trigger={() => {
          return <Button type="primary"> Print </Button>;
        }}
      />
    </div>
  );
  //
}
