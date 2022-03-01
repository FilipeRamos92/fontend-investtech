import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function ConsultFundItem({ fundsList, fund, setFunds }) {

    function deleteFund(id) {
        const resp = window.confirm(`Tem certeza que quer deletar "${fund.name}"?`)
        if (resp === true) {
          axios.delete(`http://localhost:3001/funds/${id}`)
          setFunds(fundsList.filter(fund => fund.id !== id))
        }
    }
    
  return (
    <tr>
      <td className="table-content">{fund.name}</td>
      <td className="table-content">{fund.cnpj}</td>
      <td className="table-content">{fund.creation_date ? fund.creation_date : "Data não preenchida"}</td>
      <td className="table-content">
          <Link to={`/funds/edit/${fund.id}`}>
            <button className="btn-edit">Editar</button>
          </Link>
          <button className="btn-delete" onClick={() => deleteFund(fund.id)}>X</button>
      </td>
    </tr>
  );
}

export default ConsultFundItem;
