import { useState } from "react";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";

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

function Cart({ cart }: any) {
  const {userDetails, setUserDetails} = useRetrieveDetails();
  // const [cartDetails, setCartDetails]=useState((userDetails)?[...userDetails?.carts]:[]);
  const handleCheckOut=()=>{
    console.log("Check out");
    fetch(`http://localhost:15555/api/main/cart/checkOutCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if(!data.error){
          console.log(data);
          setUserDetails(data);
        }
        else{
          console.log("transaction failed");
        }

      })
  }
  const handleQuantityChange=(choice:String, itemId:number)=>{
    const newCart:Cart[]=[];
    userDetails?.carts?.map((ele)=>{
      if (ele.item.id===itemId){
        if (choice==='-'){
          newCart.push({...ele, quantity:ele.quantity-1})
        }
        else{
          newCart.push({...ele, quantity:ele.quantity+1})
        }
      }
      else{
        newCart.push({...ele})
      }
    })
    if (newCart){
      setUserDetails({...userDetails!,carts:newCart})
    }
    
  }

  const handleDeleteItem=(itemId:number)=>{
    const newCart:Cart[]=[];
    userDetails?.carts?.map((ele)=>{
      if (ele.item.id!==itemId){
        newCart.push({...ele})
      }
    })
    setUserDetails({...userDetails!,carts:newCart})
  }
  return (
    <>
      <Navbar />
      <h1>My cart</h1>
      <table>
        <tbody>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Delete</th>
        </tr>
        {userDetails?.carts?.map((details: any) => (
          <tr key={details.item.description}>
            <td>{details.item.itemName}</td>
            <td>{details.item.price}</td>
            <td>{details.item.category}</td>
            <td><button onClick={()=>{handleQuantityChange('-',details.item.id)}}>-</button>{details.quantity}<button onClick={()=>{handleQuantityChange('+', details.item.id)}}>+</button></td>
            <td><button onClick={()=>handleDeleteItem(details.item.id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
          <button onClick={handleCheckOut}>Check out</button>
    </>
  );
}

export default Cart;
