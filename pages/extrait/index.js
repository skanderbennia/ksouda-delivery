import { Button } from "antd";
import bwipjs from "bwip-js";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useRecoilState } from "recoil";
import { extraitAtom } from "../../atoms/extraitAtom";
import style from "../../styles/Extrait.module.css";
export default function Extrait() {
  const [extrait, setExtrait] = useRecoilState(extraitAtom);
  const [image, setImage] = useState(null);
  let extraitRef = useRef();
  let buttonRef = useRef();
  useEffect(() => {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "code128", // Barcode type
        text: extrait.codebar, // Text to encode
        height: 7,
        // Bar height, in millimeters
        includetext: true,
        textxalign: "center" // Always good to set this
      });
      setImage(canvas.toDataURL("image/png"));
    } catch (e) {
      // `e` may be a string or Error object
    }
    buttonRef.current.click();
  }, [extrait]);
  console.log(extrait.expediteur);
  return (
    <>
      <div
        style={{
          height: "90vh",
          width: "95%",
          margin: "auto",
          border: "1px solid black"
        }}
        ref={(el) => (extraitRef = el)}
      >
        <div className={style.header}>
          <div className={style.codebar}>
            <canvas id="mycanvas" />
          </div>
          <div className={style.nomExpediteur}>
            <table>
              <tr>
                <td>Nom d&apos;expediteur</td>
                <td>{extrait.expediteur.name}</td>
              </tr>
              <tr>
                <td>Email d&apos;expediteur</td>
                <td>{extrait.expediteur.email}</td>
              </tr>
              <tr>
                <td>Télephone de l&apos;expediteur</td>
                <td>{extrait.expediteur.tel}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className={style.zoneLegend}>
          <div className={style.legend}>
            Bon de livraison N°{extrait.bordereauNumber}
          </div>
        </div>
        <div className={style.zoneInfo}>
          <div className={style.info}>
            <ul>
              <li>nom client : {extrait.nomClient} </li>
              <li>Adresse : {extrait.adresse} </li>
              <li>Telephone : {extrait.telClient} </li>
            </ul>
          </div>
        </div>
        <table border={1} className={style.table}>
          <thead>
            <tr>
              <th>Article</th>
              <th>Quantité</th>
              <th>Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{extrait.contenu}</td>
              <td>{extrait.quantite}</td>
              <td>{extrait.prix_unit} DT</td>
              <td>{extrait.prix_unit * extrait.quantite} DT</td>
            </tr>
          </tbody>
        </table>
        <div className={style.footer}>
          <div className={style.infoPrix}>
            <ul>
              <div>Prix HT : {extrait.prix_unit * extrait.quantite} DT</div>
              <div>
                TVA :{" "}
                {(extrait.prix_unit * extrait.quantite * 0.19).toPrecision(3)}{" "}
                DT (19%)
              </div>
              <div> Prix de livraison : 7 DT </div>
              <div>
                Prix TTC :{" "}
                {(
                  (extrait.prix_unit * extrait.quantite * 119) / 100 -
                  7
                ).toPrecision(3)}{" "}
                DT
              </div>
            </ul>
          </div>
          <div className={style.remarque}>
            Req : Le payement se fait à travers bla bla et le client doit payer
            le montant total de la commande dans un temps determiné
          </div>
        </div>
      </div>
      <ReactToPrint
        trigger={() => (
          <Button style={{ display: "none" }} ref={buttonRef}>
            Print this out!
          </Button>
        )}
        content={() => extraitRef}
      />
    </>
  );
}
