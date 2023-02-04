import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import NoPage from './components/NoPage';
import Catalog from './components/Catalog';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/catalog" element={<Catalog />} />
      <Route path="*" element={<NoPage />} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
