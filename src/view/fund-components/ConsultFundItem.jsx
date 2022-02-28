import axios from "axios";
import React from "react";

function ConsultFundItem({ fundsList, fund, setFunds }) {

    function deleteFund(id) {
        axios.delete(`http://localhost:3001/funds/${id}`)
        setFunds(fundsList.filter(fund => fund.id !== id))
    }
    
  return (
    <tr>
      <td className="table-content">{fund.name}</td>
      <td className="table-content">{fund.cnpj}</td>
      <td className="table-content">{fund.creation_date ? fund.creation_date : "Data não preenchida"}</td>
      <td className="table-content">
          <button>Editar</button>
          <button onClick={() => deleteFund(fund.id)}>Deletar</button>
      </td>
    </tr>
  );
}

export default ConsultFundItem;
