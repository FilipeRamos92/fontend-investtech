import React, { useEffect, useState } from "react";
import axios from "axios";
import FundItem from "./FundItem";
import { Link } from "react-router-dom";

function Fund(params) {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/funds")
      .then((resp) => {
        setFunds(resp.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Retornando a listagem de fundos para acesso ao portfólio
  return (
    <div>
      <h1>Funds</h1>
        <Link to={"/funds/create"}>Create Fund</Link>
      {funds.length === 0 && <p>Sem fundos para listar</p>}
      {funds.map((fund, index) => (
        <div key={index} style={listFlex}>
          <FundItem  fund={fund} index={index} />
          <Link to={"/funds/edit"}>Edit</Link>
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Fund;


// Style

const listFlex = {
  display: "flex"
}