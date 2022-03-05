import React from "react";
import Fund from "../fund-components/Fund";

function SecurityTransactions(params) {
    return (
        <div >
            <h1 className="centralize title-page">Gerenciamento de Ativos</h1>
            <Fund type={"securityTransaction"}/>
        </div>
    )
}

export default SecurityTransactions;