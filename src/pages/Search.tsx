import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import NavbarNoLogin from "../components/NavbarNoLogin";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { useEffect, useState } from "react";
import { Item } from "../../interfaces";
import ListCard from "../components/ListCard";

export default function Search() {
  const { userDetails } = useRetrieveDetails();
  const { search } = useParams();
  const [match, setMatch] = useState<Item[]>();
  const [selection, setSelection] = useState();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    var resp: any;
    fetch(`http://localhost:15555/api/main/search/${search}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        resp = response;
        return response.json();
      })
      .then((data) => {
        if (resp.status === 200) {
          setMatch(data);
        }
      });
  }, [search, refresh]);
  return (
    <>
      {userDetails?.userId ? <Navbar /> : <NavbarNoLogin />}
      <div>
        <span className="text-lg font-bold">Search Results:</span>
      </div>
      <p>
        Showing results for: <span className="font-semibold">{search}</span>
      </p>
      {match?.map((item) => (
        <div key={item.id}>
          <ListCard
            selection={selection}
            setSelection={setSelection}
            item={item}
            userId={userDetails?.userId}
            like={
              userDetails?.favourites.filter((ele) => ele.itemId === item.id)
                .length === 1
                ? true
                : false
            }
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </div>
      ))}
    </>
  );
}
