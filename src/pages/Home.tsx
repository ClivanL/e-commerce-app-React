import Navbar from "../components/Navbar"
import Button from "../components/Button"
import NavbarNoLogin from "../components/NavbarNoLogin"
import {useContext} from 'react'
import {LoginContext} from "../App"
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import Searchbar from "../components/Searchbar"

function Home(){
    const {login}=useContext(LoginContext)
    const {userDetails}= useRetrieveDetails();
    return(<>
    {(login||userDetails?.userId)?
    <div>
    <Navbar balance={userDetails?.balance!}/>
    This is the start of the app. 
    <h1 className="text-4xl font-bold underline">
    Hello {userDetails?.username}!
    </h1>
    <br></br>
    Click the buttons to begin buying or selling:
    <div>
    <Button label="BUY" dest="category"/>
    <Button label="SELL" dest="newproduct"/>
    </div>

    </div>
    :
    <div>
    <NavbarNoLogin/>
    <div className="y-auto">
    <p>Please login to view page</p>
    <Button label="Go to login page" dest="login"/>
    </div>
    </div>
    
    }
    </>)
}

export default Home