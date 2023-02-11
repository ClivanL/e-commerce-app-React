import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"
import Button from "../components/Button"

function Home(){
    return(<>
    <Navbar/>
    This is the start of the app. 
    <h1 className="text-4xl font-bold underline">
    Hello user!
    </h1>
    <br></br>
    Click the buttons to begin buying or selling:
    <Button label="BUY" dest="newproduct"/>
    <Button label="SELL" dest="catalog"/>
    </>)
}

export default Home