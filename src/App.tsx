import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/NoPage';
import Catalog from './pages/Catalog';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import SignUp from './pages/SignUp';

interface productTypes {
  name:string,
  price:number,
  category:string,
  description:string,
  imgUrl:string
}

interface userAccountTypes{
  id:number,
  name:string,
  username:string,
  password:string,
  productsId:[]
}

function App(){
  const [productList, setProductList] = useState<productTypes[]>([])
  const [login, setLogin]=useState(false)
  const [cart,setCart]=useState<productTypes[]>([])
  const [userAccounts, setUserAccounts]=useState<userAccountTypes[]>([])

  const handleAddProduct=(newProduct:productTypes)=>{
    setProductList([...productList,newProduct])
  }

  const addToCart=(newProduct:productTypes)=>{
    setCart([...cart, newProduct])
  }

  const addNewAccount=(newAccount:userAccountTypes)=>{
    setUserAccounts([...userAccounts, newAccount]);
  }

  const categories=["All products","Snacks", "Candies", "Toys"]

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home login={login} setLogin={setLogin}/>}/>
      <Route path="/category" element={<Category setLogin={setLogin} categories={categories}/>}/>
      <Route path="/category/:choice" element={<Catalog productList={productList} setLogin={setLogin} addToCart={addToCart}/>}/>
      <Route path="/category/:choice/:productid" element={<Product setLogin={setLogin} addToCart={addToCart}/>}/>
      <Route path="/mycart" element={<Cart setLogin={setLogin} cart={cart}/>}/>
      <Route path="/signup" element={<SignUp addNewAccount={addNewAccount}/>} />
      {/* <Route path="/catalog" element={<Catalog productList={productList} setLogin={setLogin}/>} /> */}
      <Route path="/newproduct" element={<NewProduct handleAddProduct={handleAddProduct} setLogin={setLogin} categories={categories}/>} />
      <Route path="/login" element={<Login setLogin={setLogin}/>}/>
      <Route path="*" element={<NoPage />} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
