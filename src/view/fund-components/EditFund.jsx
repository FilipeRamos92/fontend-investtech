import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
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

  const [validMessage, setValidMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationFund),
  });

  const editFund = (data) =>
    axios
      .put(`http://localhost:3001/funds/${id}`, data)
      .then(() => {
        setValidMessage(true);
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
      <h1 className="fund-title">Editar Cadastro</h1>
      <div className="container-form">
          <Form onSubmit={handleSubmit(editFund)}>
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
                Confirmar
              </button>
            </div>
            <div className="fund-created">
              {validMessage && (
                <Alert variant="success">Cadastro Atualizado!</Alert>
              )}
            </div>
          </Form>
      </div>
    </div>
  );
}

export default EditFund;
