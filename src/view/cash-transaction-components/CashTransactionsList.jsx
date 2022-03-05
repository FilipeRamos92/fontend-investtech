import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";



function CashTransactionsList({type}) {

  const [cashTransactions, setCashTransactions] = useState([]);
  const [funds, setFunds] = useState({})
  const paramId = useParams();

  const [paramDate, setParamDate] = useState(paramId.date);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds/${paramId.id}`)
      .then((resp) => {setFunds(resp.data)})
      .catch((error) => console.log(error));
  }, [paramId.id]);

  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_transactions/${paramId.id}/${paramDate}`)
      .then((resp) => {
        setCashTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId, paramDate, setParamDate]);

    function handleDate(e) {
    if (e.keyCode === 13) {
      const filtDate = e.target.value;
      setParamDate(filtDate);
    }
  }

  return (
    <div >
      <h4>{funds.name}</h4>
      {type === "manage" && <Link to={`/cash_transactions/transaction/${paramId.id}`}><button className="btn-new-transaction">Nova Transação</button></Link>}
      <label htmlFor="dateFilter">Filtrar: </label>
          <input
            type="text"
            name="dateFilter"
            placeholder="aaaa-mm-dd"
            onKeyDown={handleDate}
          />
      <table>
        <thead>
          <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Valor</th>
              {type === "manage" && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {cashTransactions.map((transaction, index) => (
            <CashTransactionItem
              key={index}
              transaction={transaction}
              cashTransactions={cashTransactions}
              setCashTransactions={setCashTransactions}
              index={index}
              type={type}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CashTransactionsList;
