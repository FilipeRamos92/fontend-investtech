import React, { useEffect, useState } from "react";
import SecurityItem from "./SecurityItem";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

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

  // Renderizando o portfólio baseado no "paramId.id" que é o identificador do fundo correspondente
  return (
    <div className="centralizar">
      <h1>Carteira</h1>

      <table className="table">
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
      <button onClick={() => setParamDate("2022-02-05")}>OK</button>
      <p>Balance: </p>
    </div>
  );
}

export default Wallet;