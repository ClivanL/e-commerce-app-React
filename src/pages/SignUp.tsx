import {useState} from 'react'

function SignUp({addNewAccount}:any){

    const [register,setRegister]=useState({"fullname":"","username":"","email":"", "password":"", "confirmpassword":""});

    return <>
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        value={register.fullname}
                        onChange={(e)=>setRegister({...register,"fullname":e.target.value})}
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
                        <button type="submit" onClick={()=>addNewAccount(
                              {"id":0,
                              "name":register.fullname,
                              "username":register.username,
                              "password":register.password,
                              "productsId":[]}
                        )} className="w-full text-center py-3 rounded bg-indigo-600 text-white hover:bg-indigo-400 focus:outline-none my-1">Create Account</button>
                        </div>}
                    

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and 
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>
                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>.
                    
                </div>
            </div>
        </div>
    </>
}

export default SignUp;