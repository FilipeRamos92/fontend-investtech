import React from "react";

function CashTransactionItem({ transaction }) {
  // Recebendo parâmetro da função mãe para ser renderizado em cada linha da tabela
  return (
    <tr>
      <td className="table-content">{transaction.date}</td>
      <td className="table-content">{transaction.description}</td>
      <td className="table-content">{(transaction.value).toFixed(2)}</td>
    </tr>
  );
}

export default CashTransactionItem;
