import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";



function CashTransactionsList({ type, paramDate }) {
  const [cashTransactions, setCashTransactions] = useState([]);
  const [cashLiquid, setCashLiquid] = useState(0);
  const [funds, setFunds] = useState({})
  const paramId = useParams();

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
  }, [paramId, paramDate]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_liquid/${paramId.id}/${paramDate}`)
      .then((resp) => {
        setCashLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [paramId.id, paramDate]);


  return (
    <div >
      {type === "manage" && <Link to={`/cash_transactions/transaction/${paramId.id}`}><button className="btn-new-transaction">Nova Transação</button></Link>}
      {type !== "portfolio" && <div>
        <label htmlFor="dateFilter">Filtrar: </label>
            <input
              type="text"
              name="dateFilter"
              placeholder="aaaa-mm-dd"
              // onKeyDown={handleDate}
            />
      </div>}
      
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
        <tfoot>
              <tr>
                <th>Saldo do Caixa</th>
                <th></th>
                <th>{(cashLiquid).toFixed(2)}</th>
              </tr>
            </tfoot>
      </table>
    </div>
  );
}

export default CashTransactionsList;
