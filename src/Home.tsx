import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

function Home(){
    return(<>
    <Navbar/>
    This is the start of the app. 
    <h1 className="text-4xl font-bold underline">
    Hello world!
    </h1>
    <Outlet/>
    </>)
}

export default Home