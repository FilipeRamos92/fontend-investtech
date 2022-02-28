import React from "react";

function SecurityItem({ portfolio }) {
  
  // Recebendo parâmetro da função mãe para ser renderizado em cada linha da tabela
  return (

    <tr>
      <td className="table-content">{portfolio.security.symbol}</td>
      <td className="table-content">{portfolio.quantity}</td>
      <td className="table-content">{portfolio.security.price}</td>
      <td className="table-content">{(portfolio.security.price * portfolio.quantity).toFixed(2)}</td>
    </tr>
  );
}


export default SecurityItem;
