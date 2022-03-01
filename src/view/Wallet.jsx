import React, { useEffect, useState } from "react";
import SecurityItem from "./SecurityItem";
import axios from "axios";
import { useParams } from "react-router-dom";
import CashTransactions from "./CashTransactions";

function Wallet() {
  const [portfolio, setPortifolio] = useState([]);
  const paramId = useParams();
  
  // Formatando data para passar como parâmetro na URL e alterar na filtragem por data **OBS: Ainda não foi finalizado o filtro por data**
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = String(today.getFullYear());
  let dateFormated = `${yyyy}-${mm}-${dd}`;
  
  const [paramDate, setParamDate] = useState(dateFormated);
  const [securityLiquid, setSecurityLiquid] = useState(0);
  const [cashLiquid, setCashLiquid] = useState(0);
  const balance = cashLiquid + securityLiquid;

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

  function handleDate(e) {
    if (e.keyCode === 13) {
      const filtDate = e.target.value
      setParamDate(filtDate)
    }
  }

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

  // Renderizando o portfólio baseado no "paramId.id" que é o identificador do fundo correspondente
  return (
    <div >
      <div>
        <h1 className="centralize">Portfólio</h1>
        <div>
          <span className="page-current-date">Data: {paramDate}</span>
          <label htmlFor="dateFilter">Filtrar: </label>
          <input type="text" name="dateFilter" placeholder="aaaa-mm-dd" onKeyDown={handleDate} />
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Ativo</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Financeiro</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((port, index) => (
              <SecurityItem key={index} portfolio={port} />
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <CashTransactions paramDate={paramDate}/>
      </div>
      <div>
        <p className="centralize balance">Patrimônio Líquido: {balance.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default Wallet;
