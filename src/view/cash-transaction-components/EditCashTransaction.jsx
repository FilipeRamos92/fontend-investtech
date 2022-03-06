import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";


function EditCashTransaction(params) {
  const { id } = useParams();
  const [validMessage, setValidMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const editCashTransaction = (data) =>
    axios
      .put(`http://localhost:3001/cash_transactions/${id}`, data)
      .then(() => {setValidMessage(true);
        })
      .catch(() => {
        console.log("Erro na atualização da Transação");
      });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_transactions/${id}`)
      .then((resp) => {
        reset(resp.data);
      })
      .catch((error) => console.log(error));
  }, [reset, id]);

  return (
    <div>
      <h2 className="title-register">Editar Transação de Caixa</h2>
      <div className="container-register-fund">
          <Form onSubmit={handleSubmit(editCashTransaction)}>
            <FloatingLabel
              controlId="floatingInput"
              label="Data"
              className="mb-3 input-register "
            >
              <Form.Control
                name="date"
                type="text"
                placeholder="Data"
                {...register("date")}
              />
            </FloatingLabel>
            <p>{errors.date?.message}</p>

            <FloatingLabel label="Descrição" className="mb-3 input-register">
              <Form.Control
                type="text"
                name="description"
                placeholder="Descrição"
                {...register("description")}
              />
            </FloatingLabel>
            <p>{errors.description?.message}</p>

            <FloatingLabel label="Valor" className="mb-3 input-register">
              <Form.Control
                type="number"
                name="value"
                placeholder="Valor"
                {...register("value")}
              />
            </FloatingLabel>
            <p>{errors.value?.message}</p>

            <div>
              <button className="confirm-button" type="submit">
                Confirmar
              </button>
            </div>
            <div className="fund-created">
              {validMessage && (
                <Alert variant="success">Lançamento realizado com sucesso!</Alert>
              )}
            </div>
          </Form>
      </div>
    </div>
  );
}

export default EditCashTransaction;