import React from "react";
import Fund from "../fund-components/Fund";

function Wallet(params) {

  return (
    <div>
      <h1 className="portfolio-title">Portfólio</h1>
      <Fund type={"portfolio"} />
    </div>
  );
}

export default Wallet;
