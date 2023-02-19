import Navbar from "../components/Navbar";
import products from "../../products.json"
import {useParams} from 'react-router-dom'
import ListCard from "../components/ListCard";
import { LoginContext } from "../App";
import { useContext } from "react";
import NavbarNoLogin from "../components/NavbarNoLogin";

interface productTypes {
    id:number;
    name:string,
    price:number,
    category:string,
    description:string,
    imgUrl:string
}

function Catalog({productList, addToCart}:any){
    const {login}=useContext(LoginContext)
    const {choice} = useParams();
    return <>
    {(login)?<Navbar/>:<NavbarNoLogin/>}
    <h1 className="text-red-800">List of products</h1>
    <h2>Choice of category: {choice}</h2>
    {products.filter((item:productTypes)=>{
        return choice!=="All products"?item.category===choice:true;
    }).map((item:productTypes)=>{
        return <div key={item.name}>
        <ListCard item={item} addToCart={addToCart}/>
        </div>
    })}

    <h2>NEWLY LISTED!: </h2>
    {productList.map((item:productTypes)=>{
        return <div key={item.name}>
        <ListCard item={item} addToCart={addToCart}/>
        </div>
    })}

    </>
}

export default Catalog;
