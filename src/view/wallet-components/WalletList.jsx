import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SecurityItem from "../SecurityItem";

function WalletList({ portfolio, paramDate}) {
  const paramId = useParams();
  const [securityLiquid, setSecurityLiquid] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/security_liquid/${paramId.id}/${paramDate}`)
      .then((resp) => {
        setSecurityLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [paramId.id, paramDate]);

  return (
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
                <SecurityItem 
                key={index} 
                portfolio={port} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Saldo da Carteira</th>
                <th></th>
                <th></th>
                <th>{(securityLiquid).toFixed(2)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
    )
}

export default WalletList;