import { useNavigate } from "react-router-dom";
import Button from "./Button";
import {useState} from 'react'
import {IonIcon} from "react-ion-icon"
import Searchbar from "./Searchbar";

function NavbarNoLogin(){
    let [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const moveToPage=(dest:String)=>{
        navigate(`/${dest}`)
    }
    return (<>
    {/* navigation bar here. */}
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
        <IonIcon name="logo-ionic"></IonIcon>
        </span>
        Snicker World
      </div>
      
      <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
      <IonIcon name={open ? 'close':'menu'}></IonIcon>
      </div>

      <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
            <li key="Testing1" className='md:ml-8 text-xl md:my-0 my-7'>
              <div onClick={()=>moveToPage("")} className='text-gray-800 hover:text-gray-400 duration-500'>Home</div>
            </li>
            <li key="Testing2" className='md:ml-8 text-xl md:my-0 my-7'>
            <div onClick={()=>moveToPage("category")} className='text-gray-800 hover:text-gray-400 duration-500'>Product Catalog</div>
            </li>
        <li>
        <Button label="Login/Register" dest="login"/>
        </li>
      </ul>
      </div>
    </div>
    {/* <nav>
    <Button dest="" label="Home"/>
    <Button dest="catalog" label="Product Catalog"/>
    <Button label="List New Product"/>
    </nav> */}

    </>)
}

export default NavbarNoLogin