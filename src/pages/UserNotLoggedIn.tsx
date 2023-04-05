import Button from "../components/Button";
import NavbarNoLogin from "../components/NavbarNoLogin";

export default function UserNotLoggedIn(){
    return <>
        <NavbarNoLogin />
          <h1>You are not logged in. Please log in. </h1>
          <Button label="Go to login page" dest="login" />
          </>
}