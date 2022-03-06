import axios from "axios";
import Alert from "react-bootstrap/Alert";
import React, {  useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";


function CreateCashTransaction(params) {

  const {id} = useParams()
  const [fund, setFund] = useState([]);

  const {register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      date: "",
      description: "",
      value: 0,
      fund_id: `${id}`
    }
  })

  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds/${id}`)
      .then((resp) => {setFund(resp.data)})
      .catch((error) => {console.log(error);});
  }, [id]);

  const [validMessage, setValidMessage] = useState(false);

  const addCashTransaction = data =>  {
  axios.post("http://localhost:3001/cash_transactions", data)
  .then((resp) => {setValidMessage(true)})
  .catch(() => {
    console.log("Erro no Lançamento");})}

  
  return (
    <div >
      <h1 className="title-register">{fund.name}</h1>
      <div className="container-register-fund">
        <h3 className="title-new-cash-transaction">Novo Lançamento de Caixa</h3>
        <Form onSubmit={handleSubmit(addCashTransaction)}>
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

export default CreateCashTransaction;
