import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";

function CashTransactions({paramDate}) {
  const [cashTransactions, setCashTransactions] = useState([]);
  const paramId = useParams();

  console.log(paramDate);
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
      <h3 className="centralize">Movimentação de Caixa</h3>
      <table className="portfolio-table">
        <thead>
          <tr>
              <th className="title-table">Date</th>
              <th className="title-table">Description</th>
              <th className="title-table">Value</th>
          </tr>
        </thead>
        <tbody>
          {cashTransactions.map((transaction, index) => (
            <CashTransactionItem
              key={index}
              transaction={transaction}
              index={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CashTransactions;
