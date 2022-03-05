import React from "react";
import Fund from "../fund-components/Fund";

function Wallet(params) {

  return (
    <div>
      <h1 className="centralize title-page">Portfólio</h1>
      <Fund type={"portfolio"} />
    </div>
  );
}

export default Wallet;
