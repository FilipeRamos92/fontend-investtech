import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConsultFund from "../view/fund-components/ConsultFund";
import CreateFund from "../view/fund-components/CreateFund";
import EditFund from "../view/fund-components/EditFund";
import Fund from "../view/fund-components/Fund";
import Menu from "../view/Menu";
import CreateCashTransaction from "../view/cash-transaction-components/CreateCashTransaction";
import EditCashTransaction from "../view/cash-transaction-components/EditCashTransaction";
import SecurityTransactions from "../view/security-transaction-components/SecurityTransactions";
import EditSecurityTransaction from "../view/security-transaction-components/EditSecurityTransaction";
import CreateSecurityTransaction from "../view/security-transaction-components/CreateSecurityTransaction";
import Wallet from "../view/wallet-components/Wallet"
import CashTransactions from "../view/cash-transaction-components/CashTransactions";
import Blockchain from "../view/Blockchain";
import Securities from "../view/securities-components/Securities";

const routes = () => (
  <BrowserRouter>
    <Menu />
    <div style={{margin: "0px 20px"}}>
      <Routes >
        <Route path="/funds" element={<Fund />} />
        <Route path="/funds/register" element={<CreateFund />} />
        <Route path="/funds/query" element={<ConsultFund />} />
        <Route path="/funds/edit/:id" element={<EditFund />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/cash_transactions" element={<CashTransactions />} />
        <Route path="/cash_transactions/transaction" element={<CreateCashTransaction />} />
        <Route path="/cash_transactions/edit/:id" element={<EditCashTransaction/>} />
        <Route path="/security_transactions/" element={<SecurityTransactions/>} />
        <Route path="/security_transactions/edit/:id" element={<EditSecurityTransaction/>} />
        <Route path="/security_transactions/transaction/" element={<CreateSecurityTransaction/>} />
        <Route path="/securities" element={<Securities />} />
        <Route path="/blockchain_query" element={<Blockchain />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default routes;
