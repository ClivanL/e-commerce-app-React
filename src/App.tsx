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
import MyProfile from './pages/MyProfile';
import ChangePassword from './pages/ChangePassword';
import LikedItems from './pages/LikedItems';
import { Cart } from '../interfaces';
import Search from './pages/Search';
import Statistics from './pages/Statistics';
import Payment from './pages/Payment';

export const LoginContext= createContext<any>(null);
export const SessionContext=createContext<any>(null);
export const CheckOutContext=createContext<any>(null);

function App(){
  const [login, setLogin]=useState(false)
  const [sessionToken, setSessionToken]=useState("")
  const [checkOut, setCheckOut]=useState<Cart[]>();

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
      <Route path="/profile" element={<MyProfile/>}/>
      <Route path="/changepassword" element={<ChangePassword/>}/>
      <Route path="/category" element={<Category categories={categories}/>}/>
      <Route path="/category/:choice" element={<Catalog/>}/>
      <Route path="/category/:choice/:productid" element={<Product/>}/>
      <Route path="/mycart" element={<MyCart/>}/>
      <Route path="/payment" element={<Payment/>}/>
      <Route path="/checkout" element={<CheckOutSuccessful/>}/>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
      <Route path="/salehistory" element={<SaleHistory/>}/>
      <Route path="/listeditems" element={<ListedItem/>}/>
      <Route path="/review/new/:purchaseLogId" element={<ReviewPurchase/>}/>
      <Route path="/likedItems" element={<LikedItems/>}/>
      <Route path="/likedItems/:productid" element={<Product/>}/>
      <Route path="/search/:search?" element={<Search/>}/>
      {/* <Route path="/catalog" element={<Catalog productList={productList} setLogin={setLogin}/>} /> */}
      <Route path="/statistics" element={<Statistics/>}/>
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
