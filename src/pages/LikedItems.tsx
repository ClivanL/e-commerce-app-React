import { useState } from "react";
import ListCard from "../components/ListCard";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import UserNotLoggedIn from "./UserNotLoggedIn";

export default function LikedItems() {
  const [selection, setSelection] = useState();
  const [refresh, setRefresh] = useState(false);
  const { userDetails } = useRetrieveDetails(refresh);
  return (
    <>
      {userDetails?.userId ? (
        <div>
          <Navbar balance={userDetails?.balance!}/>
          <span className="text-xl font-extrabold">Liked items here</span>
          {userDetails?.favourites.map((x) => {
            return (
              <ListCard
                selection={selection}
                setSelection={setSelection}
                item={x.item}
                userId={userDetails?.userId}
                like={true}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            );
          })}
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
