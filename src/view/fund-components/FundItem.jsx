import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FundItem({ fund , type}) {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = String(today.getFullYear());
  let dateFormated = `${yyyy}-${mm}-${dd}`;

  const [securityLiquid, setSecurityLiquid] = useState(0)
  const [cashLiquid, setCashLiquid] = useState(0)
  const balance = cashLiquid + securityLiquid

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


  return (
    <tr >
        <td className="table-content">
          {type === "portfolio" ? (<Link to={`/wallet/${fund.id}/${dateFormated}`}>{fund.name}</Link>) :
          (<Link to={`/cash_transactions/${fund.id}/${dateFormated}`}>{fund.name}</Link>)}
          
        </td>
        <td className="table-content">{fund.cnpj}</td>
        <td className="table-content">{balance.toFixed(2)}</td>
    </tr>
  );
}
export default FundItem;
