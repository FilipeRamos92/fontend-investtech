import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wallet } from "../view";
import CashTransactions from "../view/cash-transaction-components/CashTransactions";
import ConsultFund from "../view/fund-components/ConsultFund";
import CreateFund from "../view/fund-components/CreateFund";
import EditFund from "../view/fund-components/EditFund";
import Fund from "../view/fund-components/Fund";
import Menu from "../view/Menu";
import Portfolio from "../view/Portfolio";
import ConsultCashTransactions from "../view/cash-transaction-components/ConsultCashTransactions";
import CreateCashTransaction from "../view/cash-transaction-components/CreateCashTransaction";

const routes = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/funds" element={<Fund />} />
      <Route path="/funds/register" element={<CreateFund />} />
      <Route path="/funds/query" element={<ConsultFund />} />
      <Route path="/funds/edit/:id" element={<EditFund />} />
      <Route path="/wallet" element={<Portfolio />} />
      <Route path="/wallet/:id/:date" element={<Wallet />} />
      <Route path="/cash_transactions" element={<CashTransactions />} />
      <Route path="/cash_transactions/transaction/:id" element={<CreateCashTransaction />} />
      <Route path="/cash_transactions/:id/:date" element={<ConsultCashTransactions/>} />
    </Routes>
  </BrowserRouter>
);

export default routes;
