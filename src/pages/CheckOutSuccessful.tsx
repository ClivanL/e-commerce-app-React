import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CheckOutContext } from "../App";

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

  interface Cart {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item
  }

export default function CheckOutSuccessful(){
    const {checkOut}= useContext(CheckOutContext);
    console.log(checkOut);
    return <>
    <Navbar/>
    You have successfully checked out:
    <table>
        <tbody>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
            </tr>
            {checkOut?.map((item:Cart)=>{
            return <tr key={item.id}>
                    <td>{item.item.itemName}</td>
                    <td>{item.item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
            })}
        </tbody>
    </table>
    </>
}