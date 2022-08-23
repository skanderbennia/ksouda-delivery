import bwipjs from "bwip-js";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { extraitAtom } from "../../atoms/extraitAtom";
import style from "../../styles/Extrait.module.css";
export default function Extrait() {
  const [extrait, setExtrait] = useRecoilState(extraitAtom);
  const [image, setImage] = useState(null);
  useEffect(() => {
    try {
      // The return value is the canvas element
      let canvas = bwipjs.toCanvas("mycanvas", {
        bcid: "code128", // Barcode type
        text: extrait.codebar, // Text to encode
        scale: 3, // 3x scaling factor
        height: 6, // Bar height, in millimeters
        width: 3,
        textxalign: "center", // Always good to set this
      });
      console.log(canvas.toDataURL("image/png"));
      setImage(canvas.toDataURL("image/png"));
    } catch (e) {
      // `e` may be a string or Error object
    }
  }, [extrait]);
  return (
    <div
      style={{
        height: "90vh",
        width: "95%",
        margin: "auto",
        border: "1px solid black",
      }}
    >
      <div className={style.header}>
        <div className={style.codebar}>
          <canvas id="mycanvas" />
        </div>
        <div className={style.nomExpediteur}>{extrait.nomClient}</div>
      </div>
      <div className={style.zoneLegend}>
        <div className={style.legend}>Bon de livraison n° 20</div>
      </div>
      <div className={style.zoneInfo}>
        <div className={style.info}>
          <ul>
            <li>nom client : Ahmed </li>
            <li>Adresse : Rue paris , Maouba </li>
            <li>Telephone : 22499727 </li>
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
            <td>Article 1</td>
            <td>1</td>
            <td>1000</td>
            <td>1000</td>
          </tr>
        </tbody>
      </table>
      <div className={style.footer}>
        <div className={style.infoPrix}>
          <ul>
            <div>Prix HT : 1000</div>
            <div>TVA : 19%</div>
            <div>Prix TTC : 1190</div>
          </ul>
        </div>
        <div className={style.remarque}>
          Req : Le payement se fait à travers bla bla et le client doit payer le
          montant total de la commande dans un temps determiné
        </div>
      </div>
    </div>
  );
}
