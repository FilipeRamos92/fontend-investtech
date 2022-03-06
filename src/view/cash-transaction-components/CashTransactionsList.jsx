import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());
let dateFormated = `${yyyy}-${mm}-${dd}`;

function CashTransactionsList({ type, portfolioDate }) {
  const [cashTransactions, setCashTransactions] = useState([]);
  const [cashLiquid, setCashLiquid] = useState(0);
  const [funds, setFunds] = useState({});
  const paramId = useParams();
  const [paramDate, setParamDate] = useState(dateFormated);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    switch (type) {
      case "portfolio":
        setParamDate(portfolioDate)
        console.log(paramDate);
        break;
      default:
        break;
    }
  }, [paramDate, portfolioDate, type, setParamDate])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds/${paramId.id}`)
      .then((resp) => {
        setFunds(resp.data);
      })
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

  function handleDate(date) {
    let dd = String(date.getDate()).padStart(2, "0");
    let mm = String(date.getMonth() + 1).padStart(2, "0");
    let yyyy = String(date.getFullYear());
    let dateFormated = `${yyyy}-${mm}-${dd}`;
    setStartDate(date);
    setParamDate(dateFormated);
  }

  return (
    <div>
      <div>
        {type === "manage" && (
          <div className="container-new-transaction">
            <Link to={`/cash_transactions/transaction/${paramId.id}`}>
              <button className="btn-new-transaction">Nova Transação</button>
            </Link>
            <label className="label-filter-date">Data: </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDate(date)}
              locale={ptBR}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        )}
      </div>

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
        {type !== "manage" && (
          <tfoot>
            <tr>
              <th>Saldo do Caixa</th>
              <th></th>
              <th>{cashLiquid.toFixed(2)}</th>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

export default CashTransactionsList;
