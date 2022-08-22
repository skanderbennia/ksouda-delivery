import React from "react";
import style from "../styles/Extrait.module.css";
export default function Extrait() {
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
        <div className={style.codebar}>code a barre here !</div>
        <div className={style.nomExpediteur}>Mohamed Ali</div>
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
