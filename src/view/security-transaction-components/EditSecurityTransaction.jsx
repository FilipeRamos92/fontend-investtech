import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AsyncSelect from "react-select/async";
import securities from "../../api/securities";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

function EditSecurityTransaction(params) {
  const { id } = useParams();
  const [validMessage, setValidMessage] = useState(false);
  const [transactionDate, setTransactionDate] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [securityId, setSecurityId] = useState(0);
  const [transactionQuantity, setTransactionQuantity] = useState(0);
  const [transactionPrice, setTransactionPrice] = useState("");
  const [transactionDescription, setTransactionDescription] = useState("");
  const [paramId, setParamId] = useState(0);

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
        setDate(resp.data.date);
        setTransactionQuantity(Number(resp.data.quantity));
        setTransactionPrice(Number(resp.data.value));
        setTransactionDescription(resp.data.description)
        setParamId(resp.data.fund_id)})
      .catch((error) => console.log(error));
  }, [id]);

  function handleDate(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = String(date.getFullYear());
    let dateFormated = `${yyyy}-${mm}-${dd}`;
    setDate(dateFormated);
    setStartDate(date);
  }
  
  const onSubmit = (event) => {
    event.preventDefault();

    const securityTransaction = {
      date: date,
      description: transactionDescription,
      value: transactionPrice,
      quantity: transactionQuantity,
      security_id: securityId,
      fund_id: paramId,
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
    <div >
      <h1 className="fund-title">Gerenciamento de Ativos</h1>
      <div className="container-form">
        <Form onSubmit={onSubmit}>
          {/* <FloatingLabel
            controlId="floatingInput"
            label="Data"
            className="mb-3 input-register"
          >
            <Form.Control
              type="text"
              onChange={(e) => setTransactionDate(e.target.value)}
              defaultValue={transactionDate}
            />
          </FloatingLabel> */}
          <DatePicker
                className="mb-3 form-control"
                selected={startDate}
                onChange={(date) => handleDate(date)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy"
              />
          
          <AsyncSelect
            placeholder={"Selecione o Ativo"}
            className="mb-3 input-register"
            cacheOptions
            filterOption={filterOption}
            loadOptions={fetchData}
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            onChange={(e) => setSecurityId(e.id)}
          />
          <FloatingLabel label="Quantidade" className="mb-3 input-register">
            <Form.Control
              type="number"
              onChange={(e) => setTransactionQuantity(Number(e.target.value))}
              value={transactionQuantity}
            />
          </FloatingLabel>
          <FloatingLabel label="Preço" className="mb-3 input-register">
            <Form.Control
              type="text"
              defaultValue={transactionPrice}
              onChange={(e) => setTransactionPrice(Number(e.target.value))}
            />
          </FloatingLabel>
          <FloatingLabel label="Descrição" className="mb-3 input-register">
            <Form.Control
              type="text"
              onChange={(e) => setTransactionDescription(e.target.value)}
              value={transactionDescription}
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

export default EditSecurityTransaction;
