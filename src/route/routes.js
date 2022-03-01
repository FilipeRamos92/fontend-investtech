import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Wallet } from "../view";
import CashTransactions from "../view/CashTransactions";
import ConsultFund from "../view/fund-components/ConsultFund";
import CreateFund from "../view/fund-components/CreateFund";
import EditFund from "../view/fund-components/EditFund";
import Fund from "../view/fund-components/Fund";
import Menu from "../view/Menu";

const routes = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/funds" element={<Fund />} />
      <Route path="/funds/register" element={<CreateFund />} />
      <Route path="/funds/query" element={<ConsultFund />} />
      <Route path="/funds/edit/:id" element={<EditFund />} />
      <Route path="/wallet" element={<Fund />} />
      <Route path="/wallet/:id/:date" element={<Wallet />} />
      <Route path="/cash_transactions" element={<CashTransactions />} />
    </Routes>
  </BrowserRouter>
);

export default routes;
