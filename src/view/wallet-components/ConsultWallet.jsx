import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CashTransactionsList from "../cash-transaction-components/CashTransactionsList";
import WalletList from "./WalletList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());
let dateFormated = `${yyyy}-${mm}-${dd}`;

function ConsultWallet({ type }) {
  const [portfolio, setPortifolio] = useState([]);
  const [funds, setFunds] = useState({});
  const paramId = useParams();
  const [paramDate, setParamDate] = useState(dateFormated);

  
  const [securityLiquid, setSecurityLiquid] = useState(0);
  const [cashLiquid, setCashLiquid] = useState(0);
  const balance = cashLiquid + securityLiquid;

  const [startDate, setStartDate] = useState(new Date());

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
      .get(`http://localhost:3001/portfolios/${paramId.id}/${paramDate}`)
      .then((resp) => {
        setPortifolio(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId, paramDate]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/security_liquid/${paramId.id}/${paramDate}`)
      .then((resp) => {
        setSecurityLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [paramId.id, paramDate]);

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
        <h1 className="portfolio-title">{funds.name}</h1>

          
        <div className="date-filter">
          <h3 className="portofolio-security-title">Portfólio</h3>
          <label className="label-filter-date">Data: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDate(date)}
            locale={ptBR}
            dateFormat="dd/MM/yyyy"
          />
        </div>

      </div>
      <div>
        <WalletList portfolio={portfolio} paramDate={paramDate}/>
      </div>
      <div>
        {type !== "securityTransaction" && (
          <div>
            <h3 className="">Movimentação de Caixa</h3>
            <CashTransactionsList type={"portfolio"} paramDate={paramDate} />
            <div>
              <p className="centralize balance">
                Patrimônio Líquido: {balance.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConsultWallet;
