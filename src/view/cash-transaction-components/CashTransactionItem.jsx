import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function CashTransactionItem({ transaction, type, cashTransactions,setCashTransactions }) {
  // Recebendo parâmetro da função mãe para ser renderizado em cada linha da tabela
  function deleteTransaction(id) {
    axios.delete(`http://localhost:3001/cash_transactions/${id}`)
    setCashTransactions(cashTransactions.filter(transaction => transaction.id !== id))
  }

  return (
    <tr>
      <td className="centralize">{transaction.date}</td>
      <td>{transaction.description}</td>
      <td className="centralize">{transaction.value.toFixed(2)}</td>
      {type === "manage" && <td className="centralize">
        <button className="btn-edit">Edit</button>
        <button className="btn-delete" onClick={() => deleteTransaction(transaction.id)}>X</button></td>}
    </tr>
  );
}

export default CashTransactionItem;
