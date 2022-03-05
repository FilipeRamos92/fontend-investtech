import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FundItem({ fund, type }) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = String(today.getFullYear());
  let dateFormated = `${yyyy}-${mm}-${dd}`;

  const [securityLiquid, setSecurityLiquid] = useState(0);
  const [cashLiquid, setCashLiquid] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/security_liquid/${fund.id}/${dateFormated}`)
      .then((resp) => {
        setSecurityLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [fund.id, dateFormated]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_liquid/${fund.id}/${dateFormated}`)
      .then((resp) => {
        setCashLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [fund.id, dateFormated]);

  const [currentLink, setCurrentLink] = useState();
  useEffect(() => {
    switch (type) {
      case "portfolio":
        setCurrentLink(
          <Link to={`/wallet/${fund.id}/${dateFormated}`}>{fund.name}</Link>
        );
        setBalanceValue(cashLiquid + securityLiquid);
        break;
      case "cashTransaction":
        setCurrentLink(
          <Link to={`/cash_transactions/${fund.id}/${dateFormated}`}>
            {fund.name}
          </Link>
        );
        setBalanceValue(cashLiquid);
        break;
      case "securityTransaction":
        setCurrentLink(
          <Link to={`/security_transactions/${fund.id}/${dateFormated}`}>
            {fund.name}
          </Link>
        );
        setBalanceValue(securityLiquid);
        break;
      default:
        break;
    }
  }, [type, setCurrentLink, cashLiquid, securityLiquid, setBalanceValue, fund.id, dateFormated, fund.name]);

  return (
    <tr>
      <td className="table-content">{currentLink}</td>
      <td className="table-content">{fund.cnpj}</td>
      <td className="table-content">{balanceValue.toFixed(2)}</td>
    </tr>
  );
}
export default FundItem;
