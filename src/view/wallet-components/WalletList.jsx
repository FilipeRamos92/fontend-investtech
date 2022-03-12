import React from "react";
import SecurityItem from "./SecurityItem";

function WalletList({ portfolio, securityLiquid}) {
 
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