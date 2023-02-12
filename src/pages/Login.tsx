import React, { ReactComponentElement, ReactNode } from "react";
import {useNavigate} from 'react-router-dom'
import NavbarNoLogin from "../components/NavBarNoLogin";

function Login({setLogin}:any){
    const navigate=useNavigate();
    const handleLogin=()=>{
        setLogin(true);
        navigate("/")
    }
    return (<>
    <NavbarNoLogin/>
    <h1>Login/Logout page</h1>
    <div>
    <button onClick={handleLogin}>Login</button>
    </div>
    
    </>)
}

export default Login;