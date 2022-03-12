import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConsultSecurityTransactionItem from "./ConsultSecurityTransactionItem";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

function SecurityTransactions(params) {
  const [funds, setFunds] = useState([]);
  const [securityTransactions, setSecurityTransactions] = useState([]);
  const [paramId, setParamId] = useState("");

  const [startDate, setStartDate] = useState(new Date());

  const options = [];
  funds.forEach((element) => {
    options.push({ value: element.id, label: element.name });
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds`)
      .then((resp) => {setFunds(resp.data)})
      .catch((error) => {console.log(error);});
  }, [setFunds]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/security_transactions_with_security_name/`
      )
      .then((resp) => {
        setSecurityTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId.id, paramId.date]);

  function handleDate(date) {
    setStartDate(date);
  }

  return (
    <div>
      <div>
        <h1 className="fund-title">Transações de Ativos</h1>
        <Link to={`/security_transactions/transaction`}>
          <button className="btn-new-transaction">Nova Transação</button>
        </Link>
        <div className="header-filter">
              <Select
                className="mb-3 funds-filter"
                placeholder="Selecione um fundo"
                options={options}
                onChange={(e) => setParamId(e.value)}
              />
              <DatePicker
                className="form-control date-filter"
                selected={startDate}
                onChange={(date) => handleDate(date)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy"
              />
            </div>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Ativo</th>
              <th>Quantidade</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {securityTransactions.map((transaction, index) => (
              <ConsultSecurityTransactionItem
                key={index}
                transaction={transaction}
                securityTransactions={securityTransactions}
                setSecurityTransactions={setSecurityTransactions}
              />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default SecurityTransactions;
