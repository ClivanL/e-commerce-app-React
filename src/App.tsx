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
import MyCart from './pages/MyCart';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import CheckOutSuccessful from './pages/CheckOutSuccessful';
import PurchaseHistory from './pages/PurchaseHistory';
import SaleHistory from './pages/SaleHistory';
import ListedItem from './pages/ListedItem';
import ReviewPurchase from './pages/ReviewPurchase';

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

interface Item {
  id: number;
  itemName: String;
  price: number;
  description: String;
  imageUrl: String;
  category: String;
  ownerId: number;
  quantity: number;
}

interface Cart {
  id:number;
  userId:number;
  itemId:number;
  quantity:number;
  item:Item
}

export const LoginContext= createContext<any>(null);
export const SessionContext=createContext<any>(null);
export const CheckOutContext=createContext<any>(null);

function App(){
  const [login, setLogin]=useState(false)
  const [cart,setCart]=useState<productTypes[]>([])
  const [userAccounts, setUserAccounts]=useState<userAccountTypes[]>([])
  const [sessionToken, setSessionToken]=useState("")
  const [checkOut, setCheckOut]=useState<Cart[]>();

  const addToCart=(newProduct:productTypes)=>{
    setCart([...cart, newProduct])
  }

  const addNewAccount=(newAccount:userAccountTypes)=>{
    setUserAccounts([...userAccounts, newAccount]);
  }

  const categories=["Snacks", "Candies", "Toys", "Electronics", "Shoes"]

  return (
    <div>
      <BrowserRouter>
      <LoginContext.Provider value={{login, setLogin}}>
      <SessionContext.Provider value={{sessionToken,setSessionToken}}>
      <CheckOutContext.Provider value={{checkOut, setCheckOut}}>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/category" element={<Category categories={categories}/>}/>
      <Route path="/category/:choice" element={<Catalog addToCart={addToCart}/>}/>
      <Route path="/category/:choice/:productid" element={<Product addToCart={addToCart}/>}/>
      <Route path="/mycart" element={<MyCart cart={cart}/>}/>
      <Route path="/checkout" element={<CheckOutSuccessful/>}/>
      <Route path="/signup" element={<SignUp addNewAccount={addNewAccount}/>} />
      <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
      <Route path="/salehistory" element={<SaleHistory/>}/>
      <Route path="/listeditems" element={<ListedItem/>}/>
      <Route path="/review/new/:purchaseLogId" element={<ReviewPurchase/>}/>
      {/* <Route path="/catalog" element={<Catalog productList={productList} setLogin={setLogin}/>} /> */}
      <Route path="/newproduct" element={<NewProduct categories={categories}/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<NoPage />} />
      </Routes>
      </CheckOutContext.Provider>
      </SessionContext.Provider>
      </LoginContext.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
