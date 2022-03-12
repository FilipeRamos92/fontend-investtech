import React from "react";

export default function SecurityItem({security}) {
    return(
    <tr>
        <td>{security.name}</td>
        <td>{security.price.toFixed(2)}</td>
        <td>{security.security_type}</td>
    </tr>
    )
    
}