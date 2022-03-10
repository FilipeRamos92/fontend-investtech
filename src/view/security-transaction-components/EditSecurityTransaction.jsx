import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import securities from "../../api/securities";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";

function EditSecurityTransaction(params) {
  const { id } = useParams();
  const [stateSecurityTransaction, setStateSecurityTransaction] = useState({});
  const [validMessage, setValidMessage] = useState(false);
  const [transactionDate, setTransactionDate] = useState(stateSecurityTransaction.date);
  const [transactionOperating, setTransactionOperating] = useState("");
  const [securityId, setSecurityId] = useState(0);
  const [transactionQuantity, setTransactionQuantity] = useState(0);
  const [transactionPrice, setTransactionPrice] = useState("");

  const options = [
    { value: "Compra", label: "Compra" },
    { value: "Venda", label: "Venda" },
  ];

  const handleDateChange = (event) => {
    setTransactionDate(event.target.value);
  };

  const handleOperationChange = (event) => {
    setTransactionOperating(event.value);
  };

  const handleSecurityChange = (event) => {
    setSecurityId(event.id);
  };
  const handleQuantityChange = (event) => {
    setTransactionQuantity(Number(event.target.value));
  };

  const handlePriceChange = (event) => {
    setTransactionPrice(Number(event.target.value));
  };

  const fetchData = async () => {
    const result = await securities.get("/securities");
    const resp = result.data;
    return resp;
  };

  const filterOption = (candidate, input) => {
    return candidate.data.__isNew__ || candidate.label.includes(input);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/security_transactions/${id}`)
      .then((resp) => {
        setStateSecurityTransaction(resp.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const onSubmit = (event) => {
    event.preventDefault();

    const securityTransaction = {
      date: transactionDate,
      description: transactionOperating,
      value: transactionPrice,
      quantity: transactionQuantity,
      security_id: securityId,
      fund_id: id,
    };

    axios
      .put(`http://localhost:3001/security_transactions/${id}`, securityTransaction)
      .then((resp) => {
        setValidMessage(true);
      })
      .catch(() => {
        console.log("Erro no Lançamento");
      });

      console.log(securityTransaction);
  };

  return (
    <div className="container-register-fund">
      <h1>Gerenciamento de Ativos</h1>
      <Form onSubmit={onSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          label="Data"
          className="mb-3 input-register "
        >
          <Form.Control
            name="date"
            type="text"
            placeholder="Data"
            onChange={handleDateChange}
            value={stateSecurityTransaction.date}
          />
        </FloatingLabel>

        <Select
          className="mb-3 input-register"
          placeholder="Operação"
          options={options}
          onChange={handleOperationChange}
          inputValue={stateSecurityTransaction.description}
        />

        <AsyncSelect
          placeholder={"Selecione o Ativo"}
          className="mb-3 input-register"
          cacheOptions
          filterOption={filterOption}
          loadOptions={fetchData}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          onChange={handleSecurityChange}
          defaultValue={stateSecurityTransaction.security_id}
        />

        <FloatingLabel label="Quantidade" className="mb-3 input-register">
          <Form.Control
            type="number"
            name="quantity"
            placeholder="Quantidade"
            onChange={handleQuantityChange}
            value={stateSecurityTransaction.quantity}
          />
        </FloatingLabel>

        <FloatingLabel label="Preço" className="mb-3 input-register">
          <Form.Control
            type="text"
            name="value"
            placeholder="Preço"
            onChange={handlePriceChange}
            value={stateSecurityTransaction.value}
          />
        </FloatingLabel>

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
  );
}

export default EditSecurityTransaction;
