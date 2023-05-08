import Navbar from "../components/Navbar";
// import products from "../../products.json"
import { useParams } from "react-router-dom";
import ListCard from "../components/ListCard";
import { LoginContext } from "../App";
import { useContext, useEffect, useState } from "react";
import NavbarNoLogin from "../components/NavbarNoLogin";
import useRetrieveDetails from "../hooks/useRetrieveDetails";

interface productTypes {
  id: number;
  itemName: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  imageUrl: string;
  ownerId: number;
  rating:number;
  likes:number;
}

function Catalog() {
  const [products, setProducts] = useState<productTypes[]>();
  const [selection, setSelection] = useState();
  const { userDetails } = useRetrieveDetails();
  const [category, setCategory]=useState("");
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
  }, []);
  const { login } = useContext(LoginContext);
  const { choice } = useParams();
  return (
    <>
      {userDetails?.userId || login ? <Navbar /> : <NavbarNoLogin />}
      <h1 className="text-red-800">List of products</h1>
      <h2>Choice of category: {choice}</h2>
      <div className="flex">
      {products
        ?.map((item: productTypes) => {
          return (
            <div key={item.itemName}>
              <ListCard
                selection={selection}
                setSelection={setSelection}
                item={item}
                userId={userDetails?.userId}
                like={userDetails?.favourites.filter((ele)=>ele.itemId===item.id).length===1?true:false}
              />
            </div>
          );
        })}
        </div>
    </>
  );
}

export default Catalog;
