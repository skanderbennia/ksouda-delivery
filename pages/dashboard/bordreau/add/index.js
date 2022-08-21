import { Button, Input } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../../../../api";
import Navbar from "../../../../components/Navbar/Navbar";
export default function Add() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  return (
    <Navbar>
      <form
        onSubmit={handleSubmit(async (data) => {
          await api.post("/bordereau", data);
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
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Adresse</label>
          <input
            className="input-add-bordreau"
            name="adresse"
            {...register("adresse", { required: true })}
          />
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Telephone client</label>
          <input
            className="input-add-bordreau"
            name="telClient"
            {...register("telClient", { required: true })}
          />
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Quantité</label>
          <input
            type="number"
            className="input-add-bordreau"
            {...register("quantite", { required: true })}
          />
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Prix</label>
          <input
            type="number"
            className="input-add-bordreau"
            {...register("prix_unit", { required: true })}
          />
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
