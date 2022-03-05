import React from "react";

function SecurityItem({ portfolio }) {
  
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
