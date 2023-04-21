import { useContext, useState } from "react";
import { LoginContext } from "../App";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import Navbar from "../components/Navbar";
import UserNotLoggedIn from "./UserNotLoggedIn";

export default function ChangePassword() {
  const { login } = useContext(LoginContext);
  const { userDetails } = useRetrieveDetails();
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChangePassword = (event: any) => {
    event.preventDefault();
    console.log(password);
  };

  return (
    <>
      {login || userDetails?.userId ? (
        <div>
          <Navbar />
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
              <button
                onClick={handleChangePassword}
                className="bg-red-500 rounded w-auto h-auto hover:bg-red-900"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
