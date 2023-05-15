import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import UserNotLoggedIn from "./UserNotLoggedIn";

export default function Statistics() {
  const { userDetails } = useRetrieveDetails();
  return (
    <>
      {userDetails?.userId ? (
        <div>
          <Navbar />
          <p className="text-xl font-extrabold">My Selling Statistics (Undeveloped feature)</p>
          <p className="text-lg font-bold">Most recent purchase</p>
          <p className="text-lg font-bold">Best selling item</p>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
