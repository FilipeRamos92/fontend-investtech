import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConsultSecurityTransactionItem from "./ConsultSecurityTransactionItem";

function ConsultSecurityTransactions(params) {
  const [fund, setFund] = useState([]);
  const [securityTransactions, setSecurityTransactions] = useState([]);
  const paramId = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds/${paramId.id}`)
      .then((resp) => {setFund(resp.data)})
      .catch((error) => {console.log(error);});
  }, [paramId.id]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/security_transactions_with_security_name/${paramId.id}/${paramId.date}`
      )
      .then((resp) => {
        setSecurityTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId.id, paramId.date]);

  return (
    <div>
      <h1 className="title-register">{fund.name}</h1>
      <h4 className="centralize">Transações de Ativos</h4>
      <Link to={`/security_transactions/transaction/${paramId.id}`}>
        <button className="btn-new-transaction">Nova Transação</button>
      </Link>
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
  );
}

export default ConsultSecurityTransactions;
