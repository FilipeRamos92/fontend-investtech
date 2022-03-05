import axios from "axios";
import React, { useEffect, useState } from "react";
import ConsultFundItem from "./ConsultFundItem";
import SearchFund from "./SearchFund";

function ConsultFund(params) {
    const [funds, setFunds] = useState([]);
    const [searchFund, setSearchFund] = useState("");
    const lowerSearch = searchFund.toLowerCase()

    const filteredFunds = funds.filter((fund) => 
    fund.name.toLowerCase().includes(lowerSearch) || 
    fund.cnpj.toLowerCase().includes(lowerSearch))

    useEffect(() => {
      axios
        .get("http://localhost:3001/funds")
        .then((resp) => {
          setFunds(resp.data);
        })
        .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1 className="consult-fund-title">Consultar Fundo</h1>
            <SearchFund searchFund={searchFund} setSearchFund={setSearchFund}/>
            <table>
                <thead>
                    <tr>
                        <th >Nome</th>
                        <th >CNPJ</th>
                        <th >Data de Criação</th>
                        <th >Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFunds.map((fund, index) => 
                    <ConsultFundItem key={index} fund={fund} fundsList={funds} setFunds={setFunds}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ConsultFund;