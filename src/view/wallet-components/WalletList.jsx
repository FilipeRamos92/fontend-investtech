import React from "react";
import SecurityItem from "../SecurityItem";

function WalletList({ portfolio}) {

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
                <SecurityItem key={index} portfolio={port} />
              ))}
            </tbody>
          </table>
        </div>
    )
}

export default WalletList;