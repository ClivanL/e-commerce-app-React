import {useNavigate} from 'react-router-dom'
import QuantitySelectionForm from './QuantitySelectionForm';
import RatingDisplay from './RatingDisplay';
import LikeButton from './LikeButton';

function ListCard({item, selection, setSelection, userId}:any){

const navigate=useNavigate();
const handleClick=(dest:string)=>{
    console.log(dest);
    navigate(dest);
}

    return <>
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a onClick={()=>handleClick(item.id.toString())}>
        <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
    </a>
    <div className="px-5 pb-5">
        <a onClick={()=>handleClick(item.id.toString())}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.itemName}</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
            <RatingDisplay rating={item.rating}/>
            <LikeButton userId={userId} itemId={item.id}/>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
            {userId===undefined?"":(item.id!==selection)?<button onClick={()=>{setSelection(item.id)}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>:<QuantitySelectionForm userId={userId} itemId={item.id} setSelection={setSelection}/>}
        </div>
    </div>
</div>
    </>
}

export default ListCard;