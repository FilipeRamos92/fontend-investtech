import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConsultSecurityTransactionItem from "./ConsultSecurityTransactionItem";

function ConsultSecurityTransactions(params) {
    
    const [securityTransactions, setSecurityTransactions] = useState([])
    const paramId = useParams()

    useEffect(() => {
        axios
        .get(`http://localhost:3001/security_transactions`)
        .then((resp) => {setSecurityTransactions(resp.data);})
        .catch((error) => {console.log(error);})
    },[])

    return (
        <div>
            <h1 className="centralize title-page">Consultar Transações de Ativos</h1>
            <Link to={`/security_transactions/transaction/${paramId.id}`}><button className="btn-new-transaction">Nova Transação</button></Link>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                {securityTransactions.map((transaction, index) => 
                    <ConsultSecurityTransactionItem key={index} transaction={transaction} />
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ConsultSecurityTransactions;