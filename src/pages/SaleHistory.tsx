import Navbar from "../components/Navbar";
import useRetrieveSaleHistory from "../hooks/useRetrieveSaleHistory";
import UserNotLoggedIn from "./UserNotLoggedIn";
import convertDateToString from "../functions/convertDateToString";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../App";

interface Item {
  id: number;
  itemName: String;
  price: number;
  description: String;
  imageUrl: String;
  category: String;
  ownerId: number;
  quantity: number;
}

interface SaleLog {
  id:number;
  userId:number;
  itemId:number;
  quantity:number;
  item:Item;
  createdAt:Date;
  userUsername:String;
}


export default function SaleHistory(){
  const [update,setUpdate]=useState(false);
  const {saleHistory}=useRetrieveSaleHistory(update);
  
    
    const login=useContext(LoginContext);
    const handleConfirm=(id:number)=>{
      var resp:any;
      fetch(`http://localhost:15555/api/main/purchaseLog/sentOut/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        resp=response;
        return response.json()})
      .then((data) => {
        console.log(resp.status);
        if (resp.status===200){
          setUpdate(!update)
        }
        else {
          alert(data.message);
        }
      });
    }
    return <>
    {login||saleHistory?<div><Navbar/>
    Sale history shown here
    <table>
        <tbody>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sale Date & Time</th>
            <th>Purchased by:</th>
            <th>Item sent out?</th>
          </tr>
          {saleHistory?.map((element) => {
            return <tr key={element.item.quantity}>
              <td>{element.item.itemName}</td>
              <td>{element.item.price}</td>
              <td>{element.quantity}</td>
              <td>{convertDateToString(element.createdAt)}</td>
              <td>{element.userUsername}</td>
              <td>{element.sent?<button className="bg-green-400 rounded text-sm border-black border w-16 h-6 font-bold">Sent!</button>:<button className="bg-blue-800 rounded text-sm border-black border w-16 h-6 font-bold" onClick={()=>handleConfirm(element.id)}>Confirm</button>}</td>
            </tr>;
          })}
        </tbody>
      </table></div>:<UserNotLoggedIn/>}
    </>
}
