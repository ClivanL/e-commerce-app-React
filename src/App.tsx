import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import NoPage from './pages/NoPage';
import Catalog from './pages/Catalog';
import NewProduct from './pages/NewProduct';
import Login from './pages/Login';

interface productTypes {
  name:string,
  price:number,
  category:string,
  description:string,
  imgUrl:string
}

function App(){
  const [productList, setProductList] = useState<productTypes[]>([])
  const [login, setLogin]=useState(false)

  const handleAddProduct=(newProduct:productTypes)=>{
    setProductList([...productList,newProduct])
  }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home login={login} setLogin={setLogin}/>}/>
      <Route path="/catalog" element={<Catalog productList={productList} setLogin={setLogin}/>} />
      <Route path="/newproduct" element={<NewProduct handleAddProduct={handleAddProduct} setLogin={setLogin}/>} />
      <Route path="/login" element={<Login setLogin={setLogin}/>}/>
      <Route path="*" element={<NoPage />} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
