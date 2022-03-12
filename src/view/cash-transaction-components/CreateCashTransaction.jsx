import axios from "axios";
import Alert from "react-bootstrap/Alert";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";


let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());
let dateFormated = `${yyyy}-${mm}-${dd}`;

function CreateCashTransaction(params) {
  const [funds, setFunds] = useState([]);
  const [paramId, setParamId] = useState("");
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const options = [];
  funds.forEach((element) => {
    options.push({ value: element.id, label: element.name });
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFunds(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const [validMessage, setValidMessage] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    let transaction = {
      date: date,
      description: description,
      value: value,
      fund_id: paramId,
    };
    axios
      .post("http://localhost:3001/cash_transactions", transaction)
      .then((resp) => {
        setValidMessage(true);
      })
      .catch(() => {
        console.log("Erro no Lançamento");
      });
      
      console.log(transaction);
  };

  function handleDate(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = String(date.getFullYear());
    let dateFormated = `${yyyy}-${mm}-${dd}`;
    setDate(dateFormated);
    setStartDate(date);
  }
  return (
    <div>
      <div className="container-register-fund">
        <h1 className="fund-title">Novo Lançamento de Caixa</h1>

        <div className="container-form">
          <Form onSubmit={onSubmit}>
                      
            <DatePicker
              className="mw-100 form-control"
              selected={startDate}
              onChange={(date) => handleDate(date)}
              locale={ptBR}
              dateFormat="dd/MM/yyyy"
            />

            <Select
              className="mb-3 select-fund"
              placeholder="Selecione um fundo"
              options={options}
              onChange={(e) => {
                setParamId(e.value);
              }}
            />

            <FloatingLabel label="Valor" className="mb-3">
              <Form.Control
                type="number"
                onChange={(e) => setValue(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel label="Descrição" className="mb-3">
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            <div>
              <button className="confirm-button" type="submit">
                Confirmar
              </button>
            </div>
            <div className="fund-created">
              {validMessage && (
                <Alert variant="success">
                  Lançamento realizado com sucesso!
                </Alert>
              )}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateCashTransaction;
