import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";


function CreateCashTransaction(params) {

  const {id} = useParams()

  const {register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      date: "",
      description: "",
      value: 0,
      fund_id: `${id}`
    }
  })
  const [succesMessage, setSuccessMessage] = useState("")
  
  const addCashTransaction = data =>  {
  axios.post("http://localhost:3001/cash_transactions", data)
  .then((resp) => {setSuccessMessage("Lançamento Registrado!")})
  .catch(() => {
    console.log("Erro no Lançamento");})}
  
  return (
    <div >
      <h1 className="centralize titulo-page">Gerenciamento de Caixa</h1>
      <div className="container-new-cash-transaction">
        <h3 className="title-new-cash-transaction">Novo Lançamento</h3>
        <form onSubmit={handleSubmit(addCashTransaction)}>
            <div>
                <label htmlFor="date">Data:</label>
                <input className="input-register" name="date" {...register("date")} type="text" />
                <p>{errors.date?.message}</p>
            </div>
            <div>
                <label htmlFor="description">Descrição:</label>
                <input className="input-register" name="description" {...register("description")} type="text" />
                <p>{errors.name?.message}</p>
            </div>
            <div>
                <label htmlFor="value">Valor:</label>
                <input name="value" {...register("value")} type="number" />
                <p>{errors.value?.message}</p>
            </div>
            <div className="container-confirm-button centralize">
                <button className="confirm-button" type="submit">Confirmar</button>
            </div>
            <div className="centralize">
              <span className=" valid-message">{succesMessage}</span>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCashTransaction;
