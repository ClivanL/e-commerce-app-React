import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar(){
    
    const navigate=useNavigate()

    const moveToPage=(dest:String)=>{
        navigate(`/${dest}`)
    }
    return (<>
    {/* navigation bar here. */}
    <nav>
    <button onClick={()=>moveToPage("")}>Home</button>
    <button onClick={()=>moveToPage("catalog")}>Product Catalog</button>
    </nav>

    </>)
}

export default Navbar