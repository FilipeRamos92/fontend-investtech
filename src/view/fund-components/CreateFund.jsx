import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FloatingLabel, Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

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

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());
let dateFormated = `${yyyy}-${mm}-${dd}`;

function CreateFund(params) {
  const [validMessage, setValidMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationFund),
    defaultValues: {
      name: "",
      cnpj: "",
      creation_date: dateFormated,
    },
  });
  const addFund = (data) =>
    axios
      .post("http://localhost:3001/funds", data)
      .then(() => {
        setValidMessage(true);
      })
      .catch(() => {
        console.log("Erro no Cadastro");
      });

  return (
    <div>
      <h1 className="title-register">Cadastrar Fundo</h1>

      <div className="container-register-fund">
          <Form onSubmit={handleSubmit(addFund)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Nome"
              className="mb-3 input-register "
            >
              <Form.Control
                name="name"
                type="text"
                placeholder="Nome"
                {...register("name")}
              />
            </FloatingLabel>
            <p>{errors.name?.message}</p>
            <FloatingLabel label="CNPJ" className="mb-3 input-register">
              <Form.Control
                type="text"
                name="cnpj"
                placeholder="CNPJ"
                {...register("cnpj")}
              />
            </FloatingLabel>
            <p>{errors.cnpj?.message}</p>
            <div>
              <button className="confirm-button" type="submit">
                Cadastrar
              </button>
            </div>
            <div className="fund-created">
              {validMessage && (
                <Alert variant="success">Cadastro Realizado com Sucesso!</Alert>
              )}
            </div>
          </Form>
      </div>
    </div>
  );
}

export default CreateFund;
