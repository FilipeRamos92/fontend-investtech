import React from "react";
import CashTransactionsList from "./CashTransactionsList";

function ConsultCashTransactions(params) {
  return (
    <div>
      <h1 className="centralize title-page">Consultar Transações de Caixa</h1>
      <CashTransactionsList type={"manage"} />
    </div>
  );
}

export default ConsultCashTransactions;
