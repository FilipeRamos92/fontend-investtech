import axios from "axios";
import React, { useEffect, useState } from "react";
import SecurityItem from "./SecurityItem";

export default function Securities(params) {
  const [securities, setSecurities] = useState([]);
    
  useEffect(() => {
    axios
      .get(`http://localhost:3001/securities_filtered`)
      .then((resp) => {
        setSecurities(resp.data);
      })
      .catch((error) => console.log(error));
  }, [setSecurities]);

  return (
    <div>
      <h1 className="fund-title"> Ativos Cadastrados</h1>
      <table>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Preço</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
        {securities.map((security, index) => <SecurityItem key={index} security={security}/>)}
        </tbody>
      </table>
    </div>
  );
}
