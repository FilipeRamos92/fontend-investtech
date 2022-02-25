import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";

function CashTransactions() {
  const [cashTransactions, setCashTransactions] = useState([]);
  const paramId = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_transactions/${paramId.id}/2022-02-17`)
      .then((resp) => {
        setCashTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId]);
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Cash Transactions</h1>
      <table
        style={{ textAlign: "center", marginLeft: "auto", marginRight: "auto" }}
      >
        <thead>
          <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Value</th>
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
