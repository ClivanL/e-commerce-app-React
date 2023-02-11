import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';


function NewProduct({handleAddProduct}:any){

const navigate=useNavigate();

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
    alert("new product added");
    navigate("/catalog")

}


    return (<>
    <Navbar/>
    {/* <h3><b>insert product</b></h3>
    <form onSubmit={handleSubmit}>
    <title>Form for new product</title>
        <label>Name: 
            <input id="name" type="text" placeholder="input product name" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} required/>
        </label>
        
        <label>Price:</label>
            <input id="price" type="number" placeholder="input price" value={product.price} onChange={(e)=>setProduct({...product,price:parseFloat(e.target.value)})} required/>
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
    </form> */}

    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add a new product</h2>
  </div>

  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product name:</label>
          <div className="mt-1">
          <input id="name" type="text" value={product.name} onChange={(e)=>setProduct({...product,name:e.target.value})} required/>
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
          <div className="mt-1">
          <input id="price" type="number" value={product.price} onChange={(e)=>setProduct({...product,price:parseFloat(e.target.value)})} required/>
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <div className="mt-1">
          <input id="category" type="text" value={product.category} onChange={(e)=>setProduct({...product,category:e.target.value})}/>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <div className="mt-1">
          <input id="description" type="text" value={product.description} onChange={(e)=>setProduct({...product,description:e.target.value})}/>
          </div>
        </div>

        <div>
          <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">image url:</label>
          <div className="mt-1">
          <input id="imgUrl" type="text" value={product.imgUrl} onChange={(e)=>setProduct({...product,imgUrl:e.target.value})}/>
          </div>
        </div>

        <div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add product</button>
        </div>
      </form>
    </div>
  </div>
</div>
    </>)
}

export default NewProduct;