import { useContext, useState } from "react";
import { LoginContext } from "../App";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import Navbar from "../components/Navbar";
import UserNotLoggedIn from "./UserNotLoggedIn";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const { login } = useContext(LoginContext);
  const { userDetails } = useRetrieveDetails();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate=useNavigate();
  const handleChangePassword = (event: any) => {
    event.preventDefault();
    console.log(password);
    var resp:any;
    fetch(`http://localhost:15555/api/main/changePassword`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "password":password.password
        }),
      })
        .then((response) => {
            resp=response;
            return response.json()})
        .then((data) => {
            if (resp.status===200){
                navigate("/profile")
            }
            alert(data.message);
            
        })
  };

  return (
    <>
      {login || userDetails?.userId ? (
        <div>
          <Navbar balance={userDetails?.balance!}/>
          <p>Password Change</p>
          <form>
            <div>
              Enter password:
              <input
                id="password"
                name="password"
                type="password"
                value={password.password}
                onChange={(e) =>
                  setPassword({ ...password, password: e.target.value })
                }
              />
            </div>
            <div>
              Confirm password:
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                value={password.confirmPassword}
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
              />
            </div>
            {password.password === password.confirmPassword ? (
              ""
            ) : (
              <span className="text-red-600">Both passwords do not match!</span>
            )}
            <div>
              {password.password === password.confirmPassword?<button
                onClick={handleChangePassword}
                className="bg-red-500 rounded w-auto h-auto hover:bg-red-900"
              >
                Confirm
              </button>:<button className="bg-gray-800 rounded w-auto h-auto" disabled>Confirm</button>}
            </div>
          </form>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
