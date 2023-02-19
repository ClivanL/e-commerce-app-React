import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';

function Category({categories}:any){

    

    return <>
    <Navbar/>
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
