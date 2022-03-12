import axios from "axios";
import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";

function EditCashTransaction(params) {

  const [fundsSelect, setFundsSelect] = useState([]);
  const [fundId, setFundId] = useState(0);
  
  const [date, setDate] = useState("");
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFundsSelect(resp.data);
      })
      .catch((error) => console.log(error));
  }, [setFundsSelect]);


  const options = [];
  fundsSelect.forEach((element) => {
    options.push({ value: element.id, label: element.name });
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_transactions/${id}`)
      .then((resp) => {
        setDate(resp.data.date);
        setDescription(resp.data.description);
        setValue(resp.data.value);
        setFundId(resp.data.fund_id)
        })
      .catch(() => {
        console.log("Erro na atualização da Transação");
      });
  }, [id])
  
  const [validMessage, setValidMessage] = useState(false);
  
  const onSubmit = (event) => {
    event.preventDefault();
    let transaction = {
      date: date, 
      description: description,
      value: value,
      fund_id: fundId,
    }
      axios
        .put(`http://localhost:3001/cash_transactions/${id}`, transaction)
        .then(() => {setValidMessage(true);
          })
        .catch(() => {
          console.log("Erro na atualização da Transação");
        });
      
  }

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
      <h2 className="fund-title">Editar Transação de Caixa</h2>
        <div className="container-register-fund">
          <div className=" container-form">
            <Form onSubmit={onSubmit}>
               <DatePicker
                className="mb-3 form-control"
                selected={startDate}
                onChange={(date) => handleDate(date)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy"
              />
              <FloatingLabel label="Descrição" className="mb-3 input-register ">
                <Form.Control
                  type="text"
                  name="description"
                  defaultValue={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel label="Valor" className="mb-3 input-register">
                <Form.Control
                  type="number"
                  name="value"
                  placeholder="Valor"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </FloatingLabel>
              <div>
                <button className="confirm-button" type="submit">
                  Confirmar
                </button>
              </div>
              <div className="fund-created">
                {validMessage && (
                  <Alert variant="success">Lançamento atualizado com sucesso!</Alert>
                )}
              </div>
            </Form>
          </div>
      </div>
    </div>
  );
}

export default EditCashTransaction;