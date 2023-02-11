import Navbar from "../components/Navbar";
import products from "../../products.json"
import { ReactPropTypes } from "react";

interface productTypes {
    name:string,
    price:number,
    category:string,
    description:string,
    imgUrl:string
}

function Catalog({productList}:any){
    return <>
    <Navbar/>
    <h1>List of products</h1>
    {products.map((item:productTypes)=>{
        return <div>
        <ul>{item.name}</ul>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.description}</li>
        <img src={item.imgUrl} />
        <br></br>
        <button>Add to Cart</button>
        <button>Buy now</button>
        <button>Like</button>
        </div>
    })}

    <div>NEWLY LISTED!:</div>
    {productList.map((item:productTypes)=>{
        return <div>
        <ul>{item.name}</ul>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.description}</li>
        <img src={item.imgUrl} />
        <br></br>
        <button>Add to Cart</button>
        <button>Buy now</button>
        <button>Like</button>
        </div>
    })}

    </>
}

export default Catalog;