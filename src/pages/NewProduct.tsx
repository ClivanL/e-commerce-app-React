import React, {useState} from 'react'
import Navbar from '../components/Navbar';


function NewProduct({handleAddProduct}:any){

let [product,setProduct]=useState({
    name:"",
    price:0,
    category:"",
    description: "",
    imgUrl:""
})

const handleSubmit=(e:any)=>{
    e.preventDefault();
    console.log("clicked");
    handleAddProduct(product);

}


    return (<>
    <Navbar/>
    <h3><b>insert product</b></h3>
    <form onSubmit={handleSubmit}>
    <title>Form for new product</title>
        <label>Name: 
            <input id="name" type="text" placeholder="input product name" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})}/>
        </label>
        
        <label>Price:</label>
            <input id="price" type="number" placeholder="input price" value={product.price} onChange={(e)=>setProduct({...product,price:parseFloat(e.target.value)})}/>
        <label>Category:
            <input id="category" type="text" placeholder="input category" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}/>
        </label>
        <label>Description
            <input id="description" type="text" placeholder="input description" value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}/>
        </label>
        <label>Url:
            <input id="imgUrl" type="text" placeholder="input url for image" value={product.imgUrl} onChange={(e)=>setProduct({...product,imgUrl:e.target.value})}/>
        </label>
        <button type="submit">Add product</button>
    </form>
    </>)
}

export default NewProduct;