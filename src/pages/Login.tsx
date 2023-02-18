import {useNavigate} from 'react-router-dom'
import NavbarNoLogin from "../components/NavbarNoLogin";
import users from '../../userAccounts.json'

function Login({setLogin}:any){

    const navigate=useNavigate();
    const handleLogin=(event:any)=>{
        event.preventDefault();
        console.log(event.target.username.value);
        const condition=users.filter((item)=>item.username===event.target.username.value && item.password===event.target.password.value)
        console.log(condition)
        if (condition.length!==0){
            setLogin(true);
            navigate("/");
        }
        else{
            alert("Username or password is wrong. Please re-enter.")
        }


    }
    return (<>
    <NavbarNoLogin/>
    <h1>Login/Logout page</h1>
    <div>
        <form onSubmit={handleLogin}>
        <input id="username" placeholder="username"/>
        <input id="password" placeholder="password" type="password" autoComplete='true'/>
        <button>Login</button>
        </form>
    
    </div>
    <p>Don't have an account?</p>
    <button onClick={()=>navigate("/signup")}>Register</button>
    </>)
}

export default Login;