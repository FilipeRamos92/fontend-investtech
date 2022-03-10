import axios from "axios";
import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import securities from "../../api/securities";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";

function CreateSecurityTransaction(params) {
  const { id } = useParams();
  const [validMessage, setValidMessage] = useState(false);
  const [transactionDate, setTransactionDate] = useState("");
  const [transactionOperating, setTransactionOperating] = useState("");
  const [securityId, setSecurityId] = useState(0);
  const [securityName, setSecurityName] = useState("");
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
    setSecurityName(event.name);
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

  const onSubmit = (event) => {
    event.preventDefault();
    const cashTransaction = {
      date: transactionDate,
      description: `${transactionOperating} de ${securityName}`,
      value: transactionOperating === "Compra" ? (transactionQuantity * transactionPrice * -1) : (transactionQuantity * transactionPrice),
      fund_id: id,
    };

    axios
      .post("http://localhost:3001/cash_transactions", cashTransaction)
      .then((resp) => {
        setValidMessage(true);
      })
      .catch(() => {
        console.log("Erro no Lançamento");
      });

    console.log(cashTransaction);
    
    const securityTransaction = {
      date: transactionDate,
      description: transactionOperating,
      value: transactionPrice,
      quantity: transactionOperating === "Venda" ? (transactionQuantity * -1) : transactionQuantity,
      security_id: securityId,
      fund_id: id,
    };
    console.log(securityTransaction);
    
    axios
    .post("http://localhost:3001/security_transactions", securityTransaction)
    .then((resp) => {
      setValidMessage(true);
    })
    .catch(() => {
      console.log("Erro no Lançamento");
    });
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
          />
        </FloatingLabel>

        <Select
          className="mb-3 input-register"
          defaultValue={false}
          placeholder="Operação"
          options={options}
          onChange={handleOperationChange}
        />

        <AsyncSelect
          placeholder={"Selecione o Ativo"}
          className="mb-3 input-register"
          cacheOptions
          filterOption={filterOption}
          defaultOptions={false}
          loadOptions={fetchData}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          onChange={handleSecurityChange}
        />

        <FloatingLabel label="Quantidade" className="mb-3 input-register">
          <Form.Control
            type="number"
            name="quantity"
            placeholder="Quantidade"
            onChange={handleQuantityChange}
          />
        </FloatingLabel>

        <FloatingLabel label="Preço" className="mb-3 input-register">
          <Form.Control
            type="text"
            name="value"
            placeholder="Preço"
            onChange={handlePriceChange}
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

export default CreateSecurityTransaction;
