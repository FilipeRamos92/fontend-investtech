import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";



function CashTransactionsList({paramDate, type}) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = String(today.getFullYear());
  let dateFormated = `${yyyy}-${mm}-${dd}`;

  const [cashTransactions, setCashTransactions] = useState([]);
  const paramId = useParams();
  
  if (!paramDate) {
    paramDate = dateFormated
  }
  
  console.log(type);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_transactions/${paramId.id}/${paramDate}`)
      .then((resp) => {
        setCashTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId, paramDate]);

  return (
    <div >
      {type === "manage" && <Link to={`/cash_transactions/transaction/${paramId.id}`}><button className="btn-new-transaction">Nova Transação</button></Link>}
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
