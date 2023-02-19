import Navbar from "../components/Navbar";
import products from "../../products.json"
import {useParams} from 'react-router-dom'
import ListCard from "../components/ListCard";

interface productTypes {
    id:number;
    name:string,
    price:number,
    category:string,
    description:string,
    imgUrl:string
}

function Catalog({productList, addToCart}:any){
    const {choice} = useParams();
    return <>
    <Navbar/>
    <h1>List of products</h1>
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
