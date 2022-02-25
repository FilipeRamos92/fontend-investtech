import React from "react";
import { Link } from "react-router-dom";

function FundItem({ fund, index }) {
  return (
    <div>
        <Link to={`/funds/wallet/${fund.id}`}>{fund.name}</Link>
    </div>
  );
}
export default FundItem;
