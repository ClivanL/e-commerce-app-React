import { useState, createContext} from 'react'
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

export const LoginContext= createContext<any>(null);
export const SessionContext=createContext<any>(null);

function App(){
  const [productList, setProductList] = useState<productTypes[]>([])
  const [login, setLogin]=useState(false)
  const [cart,setCart]=useState<productTypes[]>([])
  const [userAccounts, setUserAccounts]=useState<userAccountTypes[]>([])
  const [sessionToken, setSessionToken]=useState("")

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
    <div>
      <BrowserRouter>
      <LoginContext.Provider value={{login, setLogin}}>
      <SessionContext.Provider value={{sessionToken,setSessionToken}}>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/category" element={<Category categories={categories}/>}/>
      <Route path="/category/:choice" element={<Catalog productList={productList} addToCart={addToCart}/>}/>
      <Route path="/category/:choice/:productid" element={<Product addToCart={addToCart}/>}/>
      <Route path="/mycart" element={<Cart cart={cart}/>}/>
      <Route path="/signup" element={<SignUp addNewAccount={addNewAccount}/>} />
      {/* <Route path="/catalog" element={<Catalog productList={productList} setLogin={setLogin}/>} /> */}
      <Route path="/newproduct" element={<NewProduct handleAddProduct={handleAddProduct} categories={categories}/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NoPage />} />
      </Routes>
      </SessionContext.Provider>
      </LoginContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
