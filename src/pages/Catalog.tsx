import Navbar from "../components/Navbar";
import products from "../../products.json"
import {useParams} from 'react-router-dom'

interface productTypes {
    name:string,
    price:number,
    category:string,
    description:string,
    imgUrl:string
}

function Catalog({productList, setLogin}:any){
    const {choice} = useParams();
    return <>
    <Navbar setLogin={setLogin}/>
    <h1>List of products</h1>
    <h2>Choice of category: {choice}</h2>
    {products.filter((item:productTypes)=>{
        return item.category===choice;
    }).map((item:productTypes)=>{
        return <div key={item.name}>
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

    <h2>NEWLY LISTED!: </h2>
    {productList.map((item:productTypes)=>{
        return <div key={item.name}>
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