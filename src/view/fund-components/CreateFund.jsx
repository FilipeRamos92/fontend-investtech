import axios from "axios";
import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"

const validationFund = yup.object().shape({
    name: yup.string().required("O nome é obrigatório").max(20, "O nome precisa ter menos de 20 caracteres" ),
    cnpj: yup.string().required("O CNPJ é obrigatório").max(14, "O CNPJ precisa ter 14 dígitos").min(14, "O CNPJ precisa ter 14 dígitos"),
})

function CreateFund(params) {

    const [validMessage, setValidMessage] = useState("")
    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(validationFund)
    })
    const addFund = data =>  
    axios.post("http://localhost:3001/funds", data)
    .then(() => {setValidMessage("Cadastro Realizado!")})
        .catch(() => {
            console.log("Erro no Cadastro");})
    

    return (
        <div>
            <h1 className="centralize title-page">Cadastrar Fundo</h1>
            <form onSubmit={handleSubmit(addFund)} className="centralize">
                <div>
                    <label htmlFor="register-name">Nome</label>
                    <input className="input-register" name="name" {...register("name")} type="text" />
                    <p>{errors.name?.message}</p>
                </div>
                <div>
                    <label htmlFor="register-cnpj">CNPJ</label>
                    <input name="cnpj" {...register("cnpj")} type="text" />
                    <p>{errors.cnpj?.message}</p>
                </div>
                <div className="container-confirm-button centralize">
                    <button className="confirm-button" type="submit">Cadastrar</button>
                </div>
                <div className="valid-message">
                    <p>{validMessage}</p>
                </div>
            </form>
        </div>
    )
}

export default CreateFund;