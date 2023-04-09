import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';
import { LoginContext } from '../App';
import { useContext } from 'react';
import NavbarNoLogin from '../components/NavbarNoLogin';
import useRetrieveDetails from '../hooks/useRetrieveDetails';

function Category({categories}:any){
const {login} = useContext(LoginContext)
const {userDetails}=useRetrieveDetails();
    return <>
    {(login||userDetails?.userId)?<Navbar/>:<NavbarNoLogin/>}
    <h1>Categories list here-cards</h1>
    <div className="inline-flex">
        <CategoryCard key="All Products" cat="All Products"/>
    {categories.map((item:any)=>
        <CategoryCard key={item} cat={item}/> 
    )}
    </div>
    </>
}
export default Category;
