import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CheckOutContext } from "../App";
import { Cart } from "../../interfaces";
import useRetrieveDetails from "../hooks/useRetrieveDetails";

export default function CheckOutSuccessful(){
    const {checkOut}= useContext(CheckOutContext);
    const {userDetails}= useRetrieveDetails();
    console.log(checkOut);
    return <>
    <Navbar balance={userDetails?.balance!}/>
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