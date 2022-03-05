import React, { useEffect, useState } from "react";
import axios from "axios";
import FundItem from "./FundItem";
import SearchFund from "./SearchFund";

function Fund({type}) {
  const [funds, setFunds] = useState([]);

  const [searchFund, setSearchFund] = useState("");
  const lowerSearch = searchFund.toLowerCase()

  const filteredFunds = funds.filter((fund) => 
  fund.name.toLowerCase().includes(lowerSearch) || 
  fund.cnpj.toLowerCase().includes(lowerSearch))

  const [balanceColumnTitle, setBalanceColumnTitle] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFunds(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);
  
  useEffect(() => {
    switch (type) {
      case "portfolio":
        setBalanceColumnTitle("Patrimônio Líquido")
        break;
      case "cashTransaction":
        setBalanceColumnTitle("Saldo em Caixa")
        break;
      case "securityTransaction":
        setBalanceColumnTitle("Saldo em Carteira")
        break;
      default:
        break;
    }
  }, [type, setBalanceColumnTitle])

  // Retornando a listagem de fundos para acesso ao portfólio
  return (
    <div >
      <h3>Fundos Disponíveis</h3>
      <SearchFund searchFund={searchFund} setSearchFund={setSearchFund}/>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>{balanceColumnTitle}</th>
          </tr>
        </thead>
        <tbody>
            {filteredFunds.map((fund, index) => 
            <FundItem type={type} key={index} fund={fund}/>)}
        </tbody>
      </table>
      
    </div>
  );
}

export default Fund;