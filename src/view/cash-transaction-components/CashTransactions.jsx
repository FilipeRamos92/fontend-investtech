import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CashTransactionItem from "./CashTransactionItem";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import Select from "react-select";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());
let dateFormated = `${yyyy}-${mm}-${dd}`;

function CashTransactions({ type, portfolioDate, portfolioId }) {
  const [cashTransactions, setCashTransactions] = useState([]);
  const [consultCashTransactions, setConsultCashTransactions] = useState([]);
  const [cashLiquid, setCashLiquid] = useState(0);
  const [paramId, setParamId] = useState("");
  const [paramDate, setParamDate] = useState(dateFormated);
  const [funds, setFunds] = useState([]);
  const [searchTransaction, setSearchTransaction] = useState("")
  const lowerSearch = searchTransaction.toLowerCase()

  const filteredTransactions = consultCashTransactions.filter((transaction) => 
        transaction.fund.name.toLowerCase().includes(lowerSearch) || transaction.date.includes(paramDate)
  )


  const options = [];
  funds.forEach((element) => {
    options.push({ value: element.id, label: element.name });
  });
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    switch (type) {
      case "portfolio":
        setParamDate(portfolioDate);
        break;
      default:
        break;
    }
  }, [paramDate, portfolioDate, type, setParamDate]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFunds(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/cash_transactions_with_funds")
      .then((resp) => {
        setConsultCashTransactions(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    portfolioId &&
    axios
      .get(
        `http://localhost:3001/cash_transactions/${
          type === "portfolio" ? portfolioId : paramId.id
        }/${paramDate}`
      )
      .then((resp) => {
        setCashTransactions(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [type, portfolioId, paramId.id, paramDate]);

  useEffect(() => {
    portfolioId &&
    axios
      .get(
        `http://localhost:3001/cash_liquid/${
          type === "portfolio" ? portfolioId : paramId.id
        }/${paramDate}`
      )
      .then((resp) => {
        setCashLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [type, portfolioId, paramId.id, paramDate]);

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
        {type !== "portfolio" && (
          <div>
            <h1 className="fund-title">Transações de Caixa</h1>
            <Link to={`/cash_transactions/transaction`}>
                <button className="btn-new-transaction">Nova Transação</button>
              </Link>
            
            <div className="header-filter">
              <Select
                className="mb-3 funds-filter"
                placeholder="Selecione um fundo"
                options={options}
                onChange={(e) => {setParamId(e.value); setSearchTransaction(e.label) }}
              />
              <DatePicker
                className="form-control date-filter"
                selected={startDate}
                onChange={(date) => handleDate(date)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy"
              />
              
            </div>
          </div>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th className="centralize">Data</th>
            {type !== "portfolio" && <th className="centralize">Fundo</th>}
            <th className="centralize">Descrição</th>
            <th className="centralize">Valor</th>
            {type !== "portfolio" && <th className="centralize">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {type === "portfolio"
            ? cashTransactions.map((transaction, index) => (
                <CashTransactionItem
                  key={index}
                  transaction={transaction}
                  cashTransactions={cashTransactions}
                  setCashTransactions={setCashTransactions}
                  index={index}
                  type={type}
                />
              ))
            : filteredTransactions.map((consultTransaction,  index) => (
                <CashTransactionItem
                  key={index}
                  transaction={consultTransaction}
                  type={type}
                  cashTransactions={consultCashTransactions}
                  setCashTransactions={setConsultCashTransactions}
                />
              ))}
        </tbody>
        {type === "portfolio" && (
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

export default CashTransactions;
