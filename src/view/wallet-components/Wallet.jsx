import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import ConsultWallet from "./ConsultWallet";

function Wallet(params) {
  const [funds, setFunds] = useState([]);
  const [paramId, setParamId] = useState("");

  useEffect(() => {
    axios
    .get("http://localhost:3001/funds")
    .then((resp) => {setFunds(resp.data);})
    .catch((error) => console.log(error))

  }, [])

  const options=[]
  funds.forEach(element => {
    options.push({value: element.id, label: element.name})
  });

  return (
    <div>
        <ConsultWallet type={"portfolio"} paramId={paramId}/>
    </div>
  );
}

export default Wallet;
