import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import api from "../../../../api";
import { userAtom } from "../../../../atoms/userAtom";
import Navbar from "../../../../components/Navbar/Navbar";
export default function Add() {
  const user = useRecoilValue(userAtom);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  console.log(errors);
  return (
    <Navbar>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          await api.post("/bordereau", { ...data, user: user.id });
          reset();
          router.push("/dashboard/bordreau");
        })}
      >
        <legend> Informations Bordereau</legend>
        <div style={{ display: "block" }} className="input-container">
          <label> Nom client</label>
          <input
            className="input-add-bordreau"
            name="nomClient"
            {...register("nomClient", { required: true })}
          />
          {errors.nomClient && errors.nomClient.type === "required" ? (
            <span className="error">Veuillez remplir le champ nom client</span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Adresse</label>
          <input
            className="input-add-bordreau"
            name="adresse"
            {...register("adresse", { required: true })}
          />
          {errors.adresse && errors.adresse.type === "required" ? (
            <span className="error">Veuillez remplir le champ adresse </span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Telephone client</label>
          <input
            className="input-add-bordreau"
            name="telClient"
            type="tel"
            defaultValue={"+216"}
            {...register("telClient", { required: true, minLength: 12 })}
          />
          {errors.telClient && errors.telClient.type === "minLength" ? (
            <span className="error">
              Veuillez remplir le champ telephone client{" "}
            </span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Quantité</label>
          <input
            type="number"
            className="input-add-bordreau"
            {...register("quantite", { required: true })}
          />
          {errors.quantite && errors.quantite.type === "required" ? (
            <span className="error">Veuillez remplir le champ quantite</span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Prix</label>
          <input
            type="number"
            className="input-add-bordreau"
            {...register("prix_unit", { required: true })}
          />
          {errors.prix_unit && errors.prix_unit.type === "required" ? (
            <span className="error">Veuillez remplir le champ prix</span>
          ) : (
            ""
          )}
        </div>

        <input
          type="submit"
          className="button-submit-bordreau"
          value={"Ajouter Bordereau"}
        />
      </form>
    </Navbar>
  );
}
