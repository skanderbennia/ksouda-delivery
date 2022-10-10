import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../../api";
import Navbar from "../../../../components/Navbar/Navbar";
import { ClipLoader } from "react-spinners";

export default function Add() {
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
          console.log(data);
          await api.post("/users/livreur", { ...data });
          reset();
          setLoading(false);
          router.push("/admin/livreur");
        })}
      >
        <legend> Ajouter Un Livreur</legend>
        <div style={{ display: "block" }} className="input-container">
          <label> Nom </label>
          <input
            className="input-add-bordreau"
            name="name"
            {...register("name", { required: true })}
          />
          {errors.name && errors.name.type === "required" ? (
            <span className="error">Veuillez remplir le champ nom </span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Email</label>
          <input
            className="input-add-bordreau"
            name="email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && errors.email.type === "required" ? (
            <span className="error">Veuillez remplir le champ email </span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Telephone </label>
          <input
            className="input-add-bordreau"
            name="tel"
            type="tel"
            defaultValue={"+216"}
            {...register("tel", { required: true, minLength: 12 })}
          />
          {errors.tel && errors.tel.type === "minLength" ? (
            <span className="error">
              Veuillez remplir le champ telephone client{" "}
            </span>
          ) : (
            ""
          )}
        </div>

        <div style={{ display: "block" }} className="input-container">
          <label> Password</label>
          <input
            type="password"
            className="input-add-bordreau"
            {...register("password", { required: true })}
          />
          {errors.password && errors.password.type === "required" ? (
            <span className="error">Veuillez remplir le champ password</span>
          ) : (
            ""
          )}
        </div>


        {loading ? (
          <div className="button-submit-bordreau">
            <ClipLoader loading={loading} size={30} color={"white"} />
          </div>
        ) : (
          <input
            type="submit"
            className="button-submit-bordreau"
            value={"Ajouter Livreur"}
          />
        )}
      </form>
    </Navbar>
  );
}
