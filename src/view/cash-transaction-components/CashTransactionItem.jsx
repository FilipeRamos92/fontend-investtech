import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function CashTransactionItem({ transaction, type, cashTransactions,setCashTransactions }) {
  function deleteTransaction(id) {
    const resp = window.confirm(`Tem certeza que quer deletar "${transaction.description}"`);
    if (resp === true) {
      axios.delete(`http://localhost:3001/cash_transactions/${id}`)
      setCashTransactions(cashTransactions.filter(transaction => transaction.id !== id))
    }
  }

  return (
    <tr>
      <td className="centralize">{transaction.date}</td>
      {type !== "portfolio" && <td>{transaction.fund.name}</td>}
      <td>{transaction.description}</td>
      <td className="centralize">{transaction.value.toFixed(2)}</td>
      {type !== "portfolio" && <td className="centralize">
        <Link to={`/cash_transactions/edit/${transaction.id}`}><button className="btn-edit">Editar</button></Link>
        <button className="btn-delete" onClick={() => deleteTransaction(transaction.id)}>X</button></td>}
      
    </tr>
  );
}

export default CashTransactionItem;
