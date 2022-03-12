import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

function SearchFund({ setSearchFund }) {
  return (
    <div className="find-fund">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
        <FormControl
          placeholder="Nome/CNPJ"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(evt) => setSearchFund(evt.target.value)}
        />
      </InputGroup>
    </div>
  );
}

export default SearchFund;
