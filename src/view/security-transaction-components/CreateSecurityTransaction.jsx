import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import AsyncSelect from 'react-select/async';
import securities from "../../api/securities";


function CreateSecurityTransaction(params) {
    const {id} = useParams()

    const {register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
          date: "",
          description: "",
          quantity: 0,
          value: 0,
          fund_id: `${id}`
        }
      })

    const [succesMessage, setSuccessMessage] = useState("")
    const [inputValue, setInputValue] = useState("");
    const [selectedValue, setSelectedValue] = useState(null);

    const handleInputChange = value => {
        setInputValue(value);
    };

    const handleChange = value => {
        setSelectedValue(value);
    };

    const fetchData = async () => {
        const result = await securities.get('/securities');
        const resp = result.data;
        return resp;
    };

    const filterOption = (candidate, input) => {
        return candidate.data.__isNew__ || candidate.label.includes(input);
      };

    const addSecurityTransaction = data =>  {
    axios.post("http://localhost:3001/security_transactions", data)
    .then((resp) => {setSuccessMessage("Lançamento Registrado!")})
    .catch(() => {
        console.log("Erro no Lançamento");})}
    return(
        <div>
            <h1>Gerenciamento de Ativos</h1>
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" name="description" {...register("description")}/>
                </Form.Group>

            </Form>
            <form onSubmit={handleSubmit(addSecurityTransaction)}>
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
            <div style={{display: "flex"}}>
                <label htmlFor="select-security">Ativo:</label>
                <AsyncSelect
                placeholder={"Selecione o Ativo"}
                name="select-security"
                className="input-securities"
                cacheOptions
                filterOption={filterOption}
                defaultOptions={false}
                value={selectedValue}
                loadOptions={fetchData}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.id}
                onInputChange={handleInputChange}
                onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="quantity">Quantidade:</label>
                <input name="quantity" {...register("quantity")} type="number" />
                <p>{errors.quantity?.message}</p>
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
    )
}

export default CreateSecurityTransaction;