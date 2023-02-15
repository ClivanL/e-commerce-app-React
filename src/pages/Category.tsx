import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';

function Category({setLogin}:any){

    const categories=["all","Snacks", "Candies", "Toys"]
    const navigate=useNavigate();
    const handleClick=(item:string)=>{
        navigate(item);
    }

    return <>
    <Navbar setLogin={setLogin}/>
    <h1>Categories list here-cards</h1>
    <div>
    {categories.map((item)=>
    <button onClick={()=>handleClick(item)} key={item}>{item}</button>
    )}
    </div>
    </>
}
export default Category;
