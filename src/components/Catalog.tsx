import Navbar from "./Navbar";
import products from "../../products.json"

interface productTypes {
    name:string,
    price:number,
    category:string,
    description:string
}

function Catalog(){
    return <>
    <Navbar/>
    <ul>List of products</ul>
    {products.map((item:productTypes)=>{
        return <>
        <li>{item.name}</li>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.description}</li>
        </>
    })}
    </>
}

export default Catalog;