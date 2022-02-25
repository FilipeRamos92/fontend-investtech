import React from "react";

function CashTransactionItem({ transaction }) {
  // Recebendo parâmetro da função mãe para ser renderizado em cada linha da tabela
  return (
    <tr>
      <td>{transaction.date}</td>
      <td>{transaction.description}</td>
      <td>{transaction.value}</td>
    </tr>
  );
}

export default CashTransactionItem;
