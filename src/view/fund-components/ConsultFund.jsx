import axios from "axios";
import React, { useEffect, useState } from "react";
import ConsultFundItem from "./ConsultFundItem";

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
            <h1 className="centralize">Consultar Fundo</h1>
            <label className="search-name-filter" htmlFor="nameFilter">Buscar:</label>
            <input 
            type="text" 
            value={searchFund} 
            name="nameFilter" 
            placeholder="Nome/CNPJ" 
            onChange={(evt) => setSearchFund(evt.target.value)} />
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