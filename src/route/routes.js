import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CashTransactions from "../view/cash-transaction-components/CashTransactions";
import ConsultFund from "../view/fund-components/ConsultFund";
import CreateFund from "../view/fund-components/CreateFund";
import EditFund from "../view/fund-components/EditFund";
import Fund from "../view/fund-components/Fund";
import Menu from "../view/Menu";
import ConsultCashTransactions from "../view/cash-transaction-components/ConsultCashTransactions";
import CreateCashTransaction from "../view/cash-transaction-components/CreateCashTransaction";
import EditCashTransaction from "../view/cash-transaction-components/EditCashTransaction";
import SecurityTransactions from "../view/security-transaction-components/SecurityTransactions";
import Wallet from "../view/wallet-components/Wallet";
import ConsultWallet from "../view/wallet-components/ConsultWallet";
import ConsultSecurityTransactions from "../view/security-transaction-components/ConsultSecurityTransactions";
import EditSecurityTransaction from "../view/security-transaction-components/EditSecurityTransaction";
import CreateSecurityTransaction from "../view/security-transaction-components/CreateSecurityTransaction";

const routes = () => (
  <BrowserRouter>
    <Menu />
    <Routes>
      <Route path="/funds" element={<Fund />} />
      <Route path="/funds/register" element={<CreateFund />} />
      <Route path="/funds/query" element={<ConsultFund />} />
      <Route path="/funds/edit/:id" element={<EditFund />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/wallet/:id/:date" element={<ConsultWallet />} />
      <Route path="/cash_transactions" element={<CashTransactions />} />
      <Route path="/cash_transactions/transaction/:id" element={<CreateCashTransaction />} />
      <Route path="/cash_transactions/:id/:date" element={<ConsultCashTransactions/>} />
      <Route path="/cash_transactions/edit/:id" element={<EditCashTransaction/>} />
      <Route path="/security_transactions/" element={<SecurityTransactions/>} />
      <Route path="/security_transactions/:id/:date" element={<ConsultSecurityTransactions/>} />
      <Route path="/security_transactions/edit/:id" element={<EditSecurityTransaction/>} />
      <Route path="/security_transactions/transaction/:id" element={<CreateSecurityTransaction/>} />
    </Routes>
  </BrowserRouter>
);

export default routes;
