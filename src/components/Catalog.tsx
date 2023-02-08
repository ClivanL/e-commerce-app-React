import Navbar from "./Navbar";
import products from "../../products.json"

interface productTypes {
    name:string,
    price:number,
    category:string,
    description:string,
    imgUrl:string
}

function Catalog(){
    return <>
    <Navbar/>
    <h1>List of products</h1>
    {products.map((item:productTypes)=>{
        return <>
        <ul>{item.name}</ul>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.description}</li>
        <img src={item.imgUrl} />
        <br></br>
        <button>Add to Cart</button>
        <button>Buy now</button>
        <button>Like</button>
        </>
    })}
    </>
}

export default Catalog;