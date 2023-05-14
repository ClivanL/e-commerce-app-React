import {useState} from 'react'
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom'

function SignUp(){

    const [register,setRegister]=useState({"name":"","username":"","email":"", "password":"", "confirmpassword":""});
    const navigate=useNavigate();
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        var resp:any;
        console.log("handleLogin");
        console.log(register);
        fetch(`http://localhost:15555/api/main/newAccount`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        username:register.username,
        name:register.name,
        email:register.email,
        password:register.password
      })
    })
      .then((response) => {
        resp=response;
        return response.json()
    })
      .then((data) => {
        if (resp.status===201){
            alert(data.message);
            navigate("/");
        }
        else{
            alert(data.message);
        }
      });
    }

    return <>
    <Navbar/>
    <form>
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <div className="text-grey-dark mt-6">
                    Already have an account?&nbsp; 
                    <a className="no-underline border-b border-blue text-blue-600" onClick={()=>navigate('/login')}>
                        Log in
                    </a>.
                </div>
                <br></br>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        value={register.name}
                        onChange={(e)=>setRegister({...register,"name":e.target.value})}
                        name="fullname"
                        placeholder="Full Name" required/>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        value={register.username}
                        onChange={(e)=>setRegister({...register,"username":e.target.value})}
                        name="username"
                        placeholder="Username" required/>                    

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        value={register.email}
                        onChange={(e)=>setRegister({...register,"email":e.target.value})}
                        name="email"
                        placeholder="Email" required/>

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        value={register.password}
                        onChange={(e)=>setRegister({...register,"password":e.target.value})}
                        name="password"
                        placeholder="Password" required/>
                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        value={register.confirmpassword}
                        onChange={(e)=>setRegister({...register,"confirmpassword":e.target.value})}
                        name="confirm_password"
                        placeholder="Confirm Password" required/>
                    {(register.confirmpassword!==register.password)?<div>
                        <p>passwords do not match!</p>
                        <button disabled>Create Account</button>
                        </div>
                        :
                        <div>
                        <p></p>
                        <button type="submit" onClick={handleSubmit} className="w-full text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-400 focus:outline-none my-1">Create Account</button>
                        </div>}
                    

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the&nbsp; 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and&nbsp;  
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </form>
    </>
}

export default SignUp;