import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import securities from "../../api/securities";
import Alert from "react-bootstrap/Alert";
import Select from "react-select";

function CreateSecurityTransaction(params) {
  const [validMessage, setValidMessage] = useState(false);
  const [transactionDate, setTransactionDate] = useState("");
  const [securityId, setSecurityId] = useState(0);
  const [transactionQuantity, setTransactionQuantity] = useState(0);
  const [transactionPrice, setTransactionPrice] = useState("");
  const [transactionDrescription, setTransactionDescription] = useState("");
  const [funds, setFunds] = useState([]);
  const [paramId, setParamId] = useState("");

  const options = [];
  funds.forEach((element) => {
    options.push({ value: element.id, label: element.name });
  });

  const handleSecurityChange = (event) => {
    setSecurityId(event.id);
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
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFunds(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const cashTransaction = {
      date: transactionDate,
      description: transactionDrescription,
      value: (transactionQuantity * transactionPrice) * -1 ,
      fund_id: paramId,
    };

    axios
      .post("http://localhost:3001/cash_transactions", cashTransaction)
      .then((resp) => {
        setValidMessage(true);
      })
      .catch(() => {
        console.log("Erro no Lançamento");
      });

    const securityTransaction = {
      date: transactionDate,
      description: transactionDrescription,
      value: transactionPrice,
      quantity: transactionQuantity,
      security_id: securityId,
      fund_id: paramId,
    };
    console.log(cashTransaction);
    
    axios
    .post("http://localhost:3001/security_transactions", securityTransaction)
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
      <h1 className="fund-title">Gerenciamento de Ativos</h1>
      
      <div className="container-form">
        <Form onSubmit={onSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Data"
            className="mb-3 input-register "
          >
            <Form.Control
              name="date"
              type="text"
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </FloatingLabel>
          <Select
                className="mb-3 select-fund"
                placeholder="Selecione um fundo"
                options={options}
                onChange={(e) => {
                  setParamId(e.value);
                }}
              />
          
          <AsyncSelect
            placeholder="Selecione um Ativo"
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
              onChange={(e) => setTransactionQuantity(Number(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Preço" className="mb-3 input-register">
            <Form.Control
              type="text"
              name="value"
              onChange={(e) => setTransactionPrice(Number(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Descrição" className="mb-3 input-register">
            <Form.Control
              type="text"
              name="value"
              onChange={(e) => setTransactionDescription(e.target.value)}
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
    </div>
  );
}

export default CreateSecurityTransaction;
