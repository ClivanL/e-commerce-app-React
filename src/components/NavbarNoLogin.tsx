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
    <div className="flex shadow-md bg-black w-full fixed top-0 left-0">
    <div className="flex px-2 font-bold text-white text-xl py-2 font-[poppins]">
    <span onClick={()=>moveToPage("")} className="text-2xl text-red-500"><IonIcon name="pizza"/></span>
    <span onClick={()=>moveToPage("")} className="px-0.5">Snicker World</span>
    </div>
    <div className="flex top-2 right-8 absolute text-white">
      <Searchbar/>
      <span onClick={()=>moveToPage("")} className="px-3 hover:text-green-300">
        Home
      </span>
      <span onClick={()=>moveToPage("category")} className="px-3 hover:text-green-300">
        Product Catalog
      </span>
      <div>
    <span onClick={()=>setOpen(!open)} className={`text-2xl ${!open?"relative hover:text-green-300":"text-green-300"}`}>
    <IonIcon name="person-add-outline"/>
    </span>
    {open?
    <ul className="absolute right-0 w-36 bg-black overflow-scroll">
    <li onClick={()=>moveToPage("login")} className="hover:text-green-300">Login/Register</li>
    </ul>
    :""}
    </div>
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