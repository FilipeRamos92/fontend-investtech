import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const validationFund = yup.object().shape({
  name: yup
    .string()
    .required("O nome é obrigatório")
    .max(20, "O nome precisa ter menos de 20 caracteres"),
  cnpj: yup
    .string()
    .required("O CNPJ é obrigatório")
    .max(14, "O CNPJ precisa ter 14 dígitos")
    .min(14, "O CNPJ precisa ter 14 dígitos"),
});

function EditFund(params) {
  const { id } = useParams();

  const [validMessage, setValidMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationFund),
  });

  const addFund = (data) =>
    axios
      .put(`http://localhost:3001/funds/${id}`, data)
      .then(() => {
        setValidMessage("Cadastro Atualizado!");
      })
      .catch(() => {
        console.log("Erro na atualização do Cadastro");
      });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds/${id}`)
      .then((resp) => {
        reset(resp.data);
      })
      .catch((error) => console.log(error));
  }, [reset, id]);

  return (
    <div>
      <h1 className="centralize title-page">Editar Cadastro</h1>
      <form onSubmit={handleSubmit(addFund)} className="centralize">
        <div>
          <label htmlFor="register-name">Nome</label>
          <input
            className="input-register"
            name="name"
            {...register("name")}
            type="text"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label htmlFor="register-cnpj">CNPJ</label>
          <input name="cnpj" {...register("cnpj")} type="text" />
          <p>{errors.cnpj?.message}</p>
        </div>
        <div className="container-confirm-button centralize">
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </div>
        <div className="valid-message">
          <p>{validMessage}</p>
        </div>
      </form>
    </div>
  );
}

export default EditFund;
