import {useNavigate} from 'react-router-dom'
import NavbarNoLogin from "../components/NavbarNoLogin";
import users from '../../userAccounts.json'
import { LoginContext } from '../App';
import {useContext} from 'react'

function Login(){

    const navigate=useNavigate();
    const {setLogin}=useContext(LoginContext)
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
    <form onSubmit={handleLogin}>
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>

                    <input 
                        id="username"
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="Username" required/>                    

                    <input 
                        id="password"
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" required autoComplete='true'/>
                        
                        <div>
                        <button type="submit" 
                        className="w-full text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-400 focus:outline-none my-1">Login</button>
                        </div>
                    

                    <div className="text-center text-sm text-grey-dark mt-4">
                        Don't have an account? Click&nbsp;
                        <a className="no-underline border-b border-grey-dark text-blue-600" onClick={()=>navigate("/signup")}>
                            here
                        </a> to&nbsp;
                        <a className="no-underline border-b border-grey-dark text-blue-600" onClick={()=>navigate("/signup")}>
                            register
                        </a>
                        .
                    </div>
                </div>
            </div>
        </div>
        </form>
    </>)
}

export default Login;