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
            <h1 className="fund-title">Consultar Fundo</h1>
            <SearchFund setSearchFund={setSearchFund}/>
            <table>
                <thead>
                    <tr>
                        <th className="centralize">Nome</th>
                        <th className="centralize">CNPJ</th>
                        <th className="centralize">Data de Criação</th>
                        <th className="centralize">Ações</th>
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