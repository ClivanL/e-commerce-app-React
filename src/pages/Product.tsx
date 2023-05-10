import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import QuantitySelector from "../components/QuantitySelector";
import { LoginContext } from "../App";
import NavbarNoLogin from "../components/NavbarNoLogin";
import convertDateToString from "../functions/convertDateToString";
import StarsButton from "../components/StarsButton";
import LikeButton from "../components/LikeButton";

interface productTypes {
  id: number;
  itemName: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  imageUrl: string;
  ownerId: number;
  rating: number;
  reviews: Review[];
  likes:number
}

interface Review {
  id: number;
  reviewedAt: Date;
  rating: number;
  comments: String;
  quantity: number;
}

function Product() {
  const [product, setProduct] = useState<productTypes>();
  const { userDetails } = useRetrieveDetails();
  const [click, setClick] = useState(false);
  const [ratingChoice, setRatingChoice] = useState<number | String>("recent");
  const [refresh, setRefresh]=useState(false);
  const login = useContext(LoginContext);
  useEffect(() => {
    fetch(
      `http://localhost:15555/api/main/item/id/${productid}/${ratingChoice}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      });
  }, [ratingChoice, refresh]);
  const { productid } = useParams();
  return (
    <>
      {login || userDetails?.userId ? <Navbar /> : <NavbarNoLogin />}
      {
        <div>
          <p className="text-2xl font-extrabold">Item Details</p>
          <ul>
            <li><span className="font-bold">Item Name: </span>{product?.itemName}</li>
            <li><span className="font-bold">Price:</span> ${product?.price}</li>
            <li><span className="font-bold">Category:</span> {product?.category}</li>
            <li><span className="font-bold">Description:</span> {product?.description}</li>
            <li><span className="font-bold">Review:</span>{product?.rating}/5</li>
            <img src={product?.imageUrl} />
          </ul>
          
          {userDetails?.userId ? (
            <div className="justify-center flex items-end">
              {click ? (
                <QuantitySelector
                  userId={userDetails?.userId}
                  itemId={product?.id}
                  setClick={setClick}
                />
              ) : (
                <button
                  className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
                  onClick={() => setClick(true)}
                >
                  Add to Cart
                </button>
              )}
              <span className="ml-2 text-3xl"><LikeButton userId={userDetails?.userId} itemId={parseInt(productid!)} like={userDetails?.favourites.filter((ele)=>ele.itemId===parseInt(productid!)).length===1?true:false} refresh={refresh} setRefresh={setRefresh}/></span>
              <span>{product?.likes}</span>
            </div>
          ) : (
            ""
          )}
          <div className="mt-10">
          <div className="text-2xl font-[Poppins] font-extrabold">Ratings</div>
          <div>
          {[5, 4, 3, 2, 1].map((item) => (
      <StarsButton key={item} setRatingChoice={setRatingChoice} rating={item}/>
          ))}
          </div>
          <div>
          <button
            onClick={() => setRatingChoice("recent")}
            className="bg-orange-700 text-white font-[Poppins] py-1 px-8 rounded border hover:bg-orange-400 
      duration-500"
          >
            Most Recent
          </button>
          <button
            onClick={() => setRatingChoice("helpful")}
            className="bg-orange-700 text-white font-[Poppins] py-1 px-8 rounded border hover:bg-orange-400 
      duration-500"
          >
            Most Helpful
          </button>
          <button
            onClick={() => setRatingChoice("critical")}
            className="bg-orange-700 text-white font-[Poppins] py-1 px-8 rounded border hover:bg-orange-400 
      duration-500"
          >
            Most Critical
          </button>
          </div>
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg mt-10">
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2">Rating</th>
                <th scope="col" className="px-2 py-2">Date reviewed</th>
                <th scope="col" className="px-2 py-2">Quantity purchased</th>
                <th scope="col" className="px-10 py-2">Comments</th>
              </tr>
              </thead>
              <tbody>
              {product?.reviews.map((item) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.rating}</th>
                    <td className="px-2 py-2">{convertDateToString(item.reviewedAt)}</td>
                    <td className="px-2 py-2">{item.quantity}</td>
                    <td className="px-2 py-2">{item.comments}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      }
    </>
  );
}

export default Product;
