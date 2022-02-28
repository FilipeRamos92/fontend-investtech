import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FundItem({ fund }) {
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
      .get(`http://localhost:3001/security_liquid/${fund.id}/2022-02-28`)
      .then((resp) => {
        setSecurityLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [fund.id]); 


  useEffect(() => {
    axios
      .get(`http://localhost:3001/cash_liquid/${fund.id}/2022-02-28`)
      .then((resp) => {
        setCashLiquid(resp.data);
      })
      .catch((error) => console.log(error));
  }, [fund.id]); 


  return (
    <tr >
        <td className="table-content">
          <Link to={`/wallet/${fund.id}/${dateFormated}`}>{fund.name}</Link>
        </td>
        <td className="table-content">{fund.cnpj}</td>
        <td className="table-content">{balance.toFixed(2)}</td>
    </tr>
  );
}
export default FundItem;
