import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import { LoginContext } from '../App';
import { useContext } from 'react';
import NavbarNoLogin from '../components/NavbarNoLogin';

function Category({categories}:any){
const {login} = useContext(LoginContext)
    return <>
    {(login)?<Navbar/>:<NavbarNoLogin/>}
    <h1>Categories list here-cards</h1>
    <div>
    {categories.map((item:any)=>
    <div key={item} >
        <CategoryCard cat={item}/>
    </div>
    )}
    </div>
    </>
}
export default Category;
