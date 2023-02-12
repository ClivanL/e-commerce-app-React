import Navbar from "../components/Navbar"
import Button from "../components/Button"
import NavbarNoLogin from "../components/NavBarNoLogin"

function Home({login, setLogin}:any){
    return(<>
    {(login)?
    <div>
    <Navbar setLogin={setLogin}/>
    This is the start of the app. 
    <h1 className="text-4xl font-bold underline">
    Hello user!
    </h1>
    <br></br>
    Click the buttons to begin buying or selling:
    <Button label="BUY" dest="newproduct"/>
    <Button label="SELL" dest="catalog"/>
    </div>
    :
    <div>
    <NavbarNoLogin/>
    <p>Please login to view page</p>
    <Button label="Go to login page" dest="login"/>
    </div>}
    </>)
}

export default Home