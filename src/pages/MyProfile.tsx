import { useContext } from "react";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { LoginContext } from "../App";
import UserNotLoggedIn from "./UserNotLoggedIn";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { userDetails } = useRetrieveDetails();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  return (
    <>
      {login || userDetails?.userId ? (
        <div>
          <Navbar />
          <p className="font-extrabold text-lg">Profile page</p>
          <p>Name: {userDetails?.name}</p>
          <p>Email: {userDetails?.email}</p>
          <div>
            <button
              onClick={() => navigate("/changepassword")}
              className="px-2 py-1 mt-2 bg-red-500 rounded w-auto h-auto hover:bg-red-900"
            >
              Change Password
            </button>
          </div>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
