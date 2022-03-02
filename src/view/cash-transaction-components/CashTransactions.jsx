import React from "react";
import Fund from "../fund-components/Fund";

function CashTransactions(params) {
    return (
        <div>
            <h1 className="centralize title-page">Gerenciamento de Caixa</h1>
            <Fund type={"cashTransaction"}/>
        </div>
    )
}

export default CashTransactions;