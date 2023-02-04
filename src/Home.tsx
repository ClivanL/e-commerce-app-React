import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

function Home(){
    return(<>
    <Navbar/>
    This is the start of the app. 
    <Outlet/>
    </>)
}

export default Home