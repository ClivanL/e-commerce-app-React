import Navbar from "../components/Navbar";
import products from "../../products.json"
import {useParams, useNavigate} from 'react-router-dom'

interface productTypes {
    id:number;
    name:string,
    price:number,
    category:string,
    description:string,
    imgUrl:string
}

function Catalog({productList, setLogin}:any){
    const {choice} = useParams();
    const navigate=useNavigate();
    const handleClick=(dest:number)=>{
        navigate(dest.toString());
    }
    return <>
    <Navbar setLogin={setLogin}/>
    <h1>List of products</h1>
    <h2>Choice of category: {choice}</h2>
    {products.filter((item:productTypes)=>{
        //return item.category===choice;
        return choice!=="all"?item.category===choice:true;
    }).map((item:productTypes)=>{
        return <div key={item.name}>
        <ul>{item.name}</ul>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.description}</li>
        <img src={item.imgUrl} />
        <br></br>
        <div>
        <button>Add to Cart</button>
        <button>Buy now</button>
        <button>Like</button>
        </div>
        <button onClick={()=>handleClick(item.id)}><b>More details</b></button>
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
        <div>
        <button>Add to Cart</button>
        <button>Buy now</button>
        <button>Like</button>
        </div>
        <button><b>More details</b></button>
        </div>
    })}

    </>
}

export default Catalog;
