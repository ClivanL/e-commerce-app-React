import Navbar from "../components/Navbar";
// import products from "../../products.json"
import {useParams} from 'react-router-dom'
import ListCard from "../components/ListCard";
import { LoginContext } from "../App";
import { useContext, useEffect, useState } from "react";
import NavbarNoLogin from "../components/NavbarNoLogin";

interface productTypes {
    id:number;
    itemName:string,
    price:number,
    quantity:number,
    category:string,
    description:string,
    imageUrl:string,
    ownerId:number
}

function Catalog({addToCart}:any){
    const [products,setProducts]=useState<productTypes[]>();
    useEffect(()=>{
        fetch(`http://localhost:15555/api/main/item/all`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setProducts(data);
            });
    },[])
    const {login}=useContext(LoginContext)
    const {choice} = useParams();
    return <>
    {(login)?<Navbar/>:<NavbarNoLogin/>}
    <h1 className="text-red-800">List of products</h1>
    <h2>Choice of category: {choice}</h2>
    {products?.filter((item:productTypes)=>{
        return choice!=="All products"?item.category===choice:true;
    }).map((item:productTypes)=>{
        return <div key={item.itemName}>
        <ListCard item={item} addToCart={addToCart}/>
        </div>
    })}

    </>
}

export default Catalog;
