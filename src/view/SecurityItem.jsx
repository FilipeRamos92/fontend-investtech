import React from "react";

function SecurityItem({ portfolio }) {
  
  // Recebendo parâmetro da função mãe para ser renderizado em cada linha da tabela
  return (

    <tr>
      <td>{portfolio.security.symbol}</td>
      <td>{portfolio.quantity}</td>
      <td>{portfolio.security.price}</td>
      <td>{(portfolio.security.price * portfolio.quantity).toFixed(2)}</td>
    </tr>
  );
}


export default SecurityItem;
