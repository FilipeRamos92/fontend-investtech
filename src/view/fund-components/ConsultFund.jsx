import axios from "axios";
import React, { useEffect, useState } from "react";
import ConsultFundItem from "./ConsultFundItem";

function ConsultFund(params) {
    const [funds, setFunds] = useState([]);

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
            <table className="table">
                <thead>
                    <tr>
                        <th className="title-table">Nome</th>
                        <th className="title-table">CNPJ</th>
                        <th className="title-table">Data de Criação</th>
                        <th className="title-table">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {funds.map((fund, index) => 
                    <ConsultFundItem key={index} fund={fund} fundsList={funds} setFunds={setFunds}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default ConsultFund;