import React, { useEffect, useState } from "react";
import axios from "axios";
import CashTransactionsList from "../cash-transaction-components/CashTransactionsList";
import WalletList from "./WalletList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
import Select from "react-select";

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = String(today.getFullYear());
let dateFormated = `${yyyy}-${mm}-${dd}`;

function ConsultWallet({ type }) {
  const [portfolio, setPortifolio] = useState([]);
  // const [funds, setFunds] = useState({});
  const [paramDate, setParamDate] = useState(dateFormated);

  const [funds, setFunds] = useState([]);
  const [paramId, setParamId] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/funds")
    .then((resp) => {setFunds(resp.data);})
    .catch((error) => console.log(error))

  }, [])

  const options=[]
  funds.forEach(element => {
    options.push({value: element.id, label: element.name})
  });

  const [securityLiquid, setSecurityLiquid] = useState(0);
  const [cashLiquid, setCashLiquid] = useState(0);
  const balance = cashLiquid + securityLiquid;

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    axios
      .get(`http://localhost:3001/portfolios/${paramId}/${paramDate}`)
      .then((resp) => {
        setPortifolio(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paramId, paramDate]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/security_liquid/${paramId}/${paramDate}`)
      .then((resp) => {
        setSecurityLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [paramId, paramDate]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_liquid/${paramId}/${paramDate}`)
      .then((resp) => {
        setCashLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [paramId, paramDate]);

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
      <div className="container">
        <h1 className="portfolio-title">{funds.name}</h1>
        <div className="header-filter">
          <Select
          className="mb-3 funds-filter"
          placeholder="Selecione um fundo"
          options={options}
          onChange={(e) => setParamId(e.value)}
          />
          <DatePicker
            className="form-control  date-filter"
            selected={startDate}
            onChange={(date) => handleDate(date)}
            locale={ptBR}
            dateFormat="dd/MM/yyyy"
          />
        </div>

      </div>
      <div>
        <WalletList portfolio={portfolio} paramDate={paramDate} securityLiquid={securityLiquid}/>
      </div>
      <div>
        {type !== "securityTransaction" && (
          <div>
            <h3 className="">Movimentação de Caixa</h3>
            <CashTransactionsList type={"portfolio"} 
            portfolioId={paramId}
            portfolioDate={paramDate} />
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
