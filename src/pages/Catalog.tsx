import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import ListCard from "../components/ListCard";
import { LoginContext } from "../App";
import { useContext, useEffect, useState } from "react";
import NavbarNoLogin from "../components/NavbarNoLogin";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { Item } from "../../interfaces";

function Catalog() {
  const [products, setProducts] = useState<Item[]>();
  const [selection, setSelection] = useState();
  const { userDetails } = useRetrieveDetails();
  const [refresh, setRefresh]=useState(false);
  useEffect(() => {
    fetch(`http://localhost:15555/api/main/item/${
      choice==="All Products"?"all":choice
    }`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, [refresh]);
  const { login } = useContext(LoginContext);
  const { choice } = useParams();
  return (
    <>
      {userDetails?.userId || login ? <Navbar /> : <NavbarNoLogin />}
      <h1 className="text-red-800">List of products</h1>
      <h2>Choice of category: {choice}</h2>
      <div className="flex">
      {products
        ?.map((item: Item) => {
          return (
            <div key={item.id}>
              <ListCard
                selection={selection}
                setSelection={setSelection}
                item={item}
                userId={userDetails?.userId}
                like={userDetails?.favourites.filter((ele)=>ele.itemId===item.id).length===1?true:false}
                setRefresh={setRefresh}
                refresh={refresh}
              />
            </div>
          );
        })}
        </div>
    </>
  );
}

export default Catalog;
