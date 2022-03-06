import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CashTransactionsList from "./CashTransactionsList";

function ConsultCashTransactions(params) {
  const { id } = useParams();
  const [fund, setFund] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/funds/${id}`)
      .then((resp) => {setFund(resp.data)})
      .catch((error) => {console.log(error);});
  }, [id]);

  return (
    <div>
      <h1 className="title-register">{fund.name}</h1>
      <h4 className="centralize">Transações de Caixa</h4>
      <CashTransactionsList type={"manage"} />
    </div>
  );
}

export default ConsultCashTransactions;
