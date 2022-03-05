import React from "react";
import { Link } from "react-router-dom";

function ConsultSecurityTransactionItem({transaction}) {
    return (
        <tr>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>{transaction.quantity}</td>
            <td>{transaction.value}</td>
            <td>
                {<div className="centralize">
                    <Link to={`/security_transactions/edit/${transaction.id}`}>
                        <button className="btn-edit">Editar</button>
                    </Link>
                    <button className="btn-delete">X</button>
                </div>}
            </td>
        </tr>
    )
}

export default ConsultSecurityTransactionItem;