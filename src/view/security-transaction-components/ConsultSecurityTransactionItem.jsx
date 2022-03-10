import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function ConsultSecurityTransactionItem({transaction, securityTransactions, setSecurityTransactions}) {
    function deleteTransaction(id) {
        const resp = window.confirm(`Tem certeza que quer deletar "${transaction.description}"`);
        if (resp === true) {
          axios.delete(`http://localhost:3001/security_transactions/${id}`)
          setSecurityTransactions(securityTransactions.filter(transaction => transaction.id !== id))
        }
    }
    return (
        <tr>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.security.symbol}</td>
            <td>{transaction.quantity}</td>
            <td>{(transaction.value).toFixed(2)}</td>
            <td>
                {<div className="centralize">
                    <Link to={`/security_transactions/edit/${transaction.id}`}>
                        <button className="btn-edit">Editar</button>
                    </Link>
                    <button className="btn-delete" onClick={() => deleteTransaction(transaction.id)}>X</button>
                </div>}
            </td>
        </tr>
    )
}

export default ConsultSecurityTransactionItem;