import React from "react";

function SearchFund({searchFund, setSearchFund}) {
    return(
        <div>
            <label className="search-name-filter" htmlFor="nameFilter">Buscar:</label>
            <input
            type="text"
            value={searchFund}
            name="nameFilter"
            placeholder="Nome/CNPJ"
            onChange={(evt) => setSearchFund(evt.target.value)} />
        </div>
        )
}

export default SearchFund;