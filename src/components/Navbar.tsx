import { useNavigate } from "react-router-dom";
import Button from "./Button";
import {useState, useContext} from 'react'
import {IonIcon} from "react-ion-icon"
import { LoginContext } from "../App";
import LogoutButton from "./LogoutButton";
import Searchbar from "./Searchbar";

function Navbar(){
    let [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const moveToPage=(dest:String)=>{
        navigate(`/${dest}`)
    }
    const {setLogin}=useContext(LoginContext)
    const handleLogout=()=>{
      fetch(`http://localhost:15555/home/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLogin(false);
        moveToPage("logout");
      
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
      <span onClick={()=>moveToPage("mycart")} className="text-2xl px-2 hover:text-green-300"><IonIcon name="cart-sharp"/></span>
      <span onClick={()=>moveToPage("likedItems")} className="text-2xl px-2 hover:text-green-300"><IonIcon name="heart-sharp"/></span>
      <div>
    <span onClick={()=>setOpen(!open)} className={`text-2xl ${!open?"relative hover:text-green-300":"text-green-300"}`}>
    <IonIcon name="person-circle-outline"/>
    </span>
    {open?
    <ul className="absolute right-0 w-36 bg-black overflow-scroll">
    <li onClick={()=>moveToPage("profile")} className="hover:text-green-300">My profile</li>
    <li onClick={()=>moveToPage("purchasehistory")} className="hover:text-green-300">My purchase History</li>
    <li onClick={()=>moveToPage("salehistory")} className="hover:text-green-300">My sale history</li>
    <li onClick={()=>moveToPage("listeditems")} className="hover:text-green-300">My listed items</li>
    <li onClick={handleLogout} className="hover:text-green-300">Logout</li>
    </ul>
    :""}
    </div>
    </div>
  </div>
    </>)
}

export default Navbar