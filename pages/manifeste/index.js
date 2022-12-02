import Image from "next/image";
import React from "react";
import Logo from "../../assets/images/logo.png";
import { manifestAtom } from "../../atoms/manifestAtom";
import { useRecoilValue } from "recoil";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Button } from "antd";
import { useEffect } from "react";
function Manifest() {
  let contentRef = useRef();
  let buttonRef = useRef();
  const manifest = useRecoilValue(manifestAtom);
  const totalPrixColis = () => {
    return manifest.bordereaus.reduce((acc, currentValue) => {
      acc = acc + currentValue.quantite * currentValue.prix_unit + 7;
      return acc;
    }, 0);
  };
  useEffect(() => {
    buttonRef.current.click();
  }, [buttonRef]);
  return (
    <>
      <div ref={(el) => (contentRef = el)}>
        <div className="manifestHeader">
          <Image
            src={Logo}
            className="imageManifest"
            width={100}
            height={100}
          />
          <span>Manifeste Ksouda Delivery</span>
        </div>
        <div className="manifestInformations">
          <div>
            <span>Nom : Ksouda Delivery</span>
            <span>Adresse : Mourouj 6 </span>
            <span>Code TVA : 0</span>
          </div>
          <div>
            <span>Contact : ksouda.delivery@contact.tn</span>
            <span>Telephone : 54 625 065 </span>
          </div>
        </div>
        <table className="manifestTablePrint">
          <tr>
            <th>Code</th>
            <th>Client</th>
            <th>Adresse</th>
            <th>Quantite</th>
            <th>Prix</th>
            <th>Total</th>
          </tr>
          {manifest.bordereaus.map((bordereau) => {
            return (
              <tr key={bordereau._id}>
                <td>{bordereau.codebar}</td>
                <td>{bordereau.nomClient}</td>
                <td>{bordereau.adresse}</td>
                <td>{bordereau.quantite}</td>
                <td>{bordereau.prix_unit} dt</td>
                <td>{bordereau.quantite * bordereau.prix_unit +7} dt</td>
              </tr>
            );
          })}
        </table>
        <div className="footerManifestPaper">
          <span>Total: {manifest.bordereaus.length + " colis"}</span>
          <span>Prix Total: {totalPrixColis() + " dt"}</span>
        </div>
      </div>
      <ReactToPrint
        trigger={() => (
          <Button style={{ display: "none" }} ref={buttonRef}>
            Print this out!
          </Button>
        )}
        content={() => contentRef}
      />
    </>
  );
}

export default Manifest;
