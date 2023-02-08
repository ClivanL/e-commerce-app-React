import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar(){
    
    const navigate=useNavigate()

    const moveToPage=(dest:String)=>{
        navigate(`/${dest}`)
    }
    return (<>
    {/* navigation bar here. */}
    <nav>
    <Button dest="" label="Home"/>
    <Button dest="catalog" label="Product Catalog"/>
    <Button label="List New Product"/>
    </nav>

    </>)
}

export default Navbar