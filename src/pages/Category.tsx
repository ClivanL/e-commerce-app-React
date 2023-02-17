import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';

function Category({setLogin, categories}:any){

    

    return <>
    <Navbar setLogin={setLogin}/>
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
