import {useParams} from 'react-router-dom'
import products from '../../products.json'
import Navbar from '../components/Navbar';

function Product({setLogin,addToCart}:any){
    const {productid} = useParams();
    return <>
        <Navbar setLogin={setLogin}/>
        {productid && products.filter((item)=>item.id===parseInt(productid)).map((item)=>
        <div key={item.id}><ul>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>{item.category}</li>
                <li>{item.description}</li>
            </ul><img src={item.imgUrl} />
        <button onClick={()=>addToCart(item)}>Add to Cart</button>
        <button>Buy now</button>
        <button>Like</button>
            
            </div>
        )}
    
    
    </>
}

export default Product;