import React, { useEffect, useState } from "react";
import axios from "axios";
import FundItem from "./FundItem";

function Fund(params) {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFunds(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);
  


  // Retornando a listagem de fundos para acesso ao portfólio
  return (
    <div >
      <h1 className="centralize">Portfólio</h1>
      <h3>Fundos Disponíveis</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Patrimônio Líquido</th>
          </tr>
        </thead>
        <tbody>
            {funds.map((fund, index) => 
            <FundItem key={index} fund={fund}/>)}
        </tbody>
      </table>
      
    </div>
  );
}

export default Fund;