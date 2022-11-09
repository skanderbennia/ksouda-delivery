import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import api from "../../../../api";
import { userAtom } from "../../../../atoms/userAtom";
import Navbar from "../../../../components/Navbar/Navbar";
import { ClipLoader } from "react-spinners";
import Select from "react-select/creatable";

export default function Add() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const user = useRecoilValue(userAtom);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const dataTags = await api.get("/tags");
      setTags(
        dataTags.data.map((elem) => {
          return {
            label: elem.value,
            value: elem.value
          };
        })
      );
    }
    fetchData();
  }, []);
  const createTag = async (_, val) => {
    if (val.action == "create-option") {
      await api.post("/tags", { tagValue: val.option.value });
      setTags([...tags, { label: val.option.value, value: val.option.value }]);
      setSelectedTags([...selectedTags, val.option.value]);
      return;
    }
    if (val.action === "select-option") {
      setSelectedTags([...selectedTags, val.option.value]);
    }
    if (val.action == "remove-value") {
      setSelectedTags(
        selectedTags.filter((elem) => elem !== val.removedValue.value)
      );
    }
    if (val.action === "clear") {
      setSelectedTags([]);
    }
  };
  return (
    <Navbar>
      <form
        onSubmit={handleSubmit(async (data) => {
          setLoading(true);
          await api.post("/bordereau", {
            ...data,
            user: user.id,
            contenu: selectedTags.join(" ")
          });
          reset();
          setLoading(false);
          router.push("/dashboard/bordereau");
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
        <div style={{ display: "block" }} className="input-container">
          <label> Prix de livraison </label>
          <input
            type="text"
            className="input-add-bordreau"
            disabled
            style={{ color: "grey" }}
            value={"7dt"}
          />
        </div>
        <div style={{ display: "block" }} className="input-container">
          <label> Description</label>
          <Select
            options={tags}
            onChange={async (value, val) => await createTag(value, val)}
            isMulti
          />
        </div>

        {loading ? (
          <div className="button-submit-bordreau">
            <ClipLoader loading={loading} size={30} color={"white"} />
          </div>
        ) : (
          <input
            type="submit"
            className="button-submit-bordreau"
            value={"Ajouter Bordereau"}
          />
        )}
      </form>
    </Navbar>
  );
}
