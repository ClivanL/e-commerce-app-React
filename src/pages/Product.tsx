import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import QuantitySelector from "../components/QuantitySelector";
import { LoginContext } from "../App";
import NavbarNoLogin from "../components/NavbarNoLogin";
import convertDateToString from "../functions/convertDateToString";

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
}

interface Review {
  id: number;
  reviewedAt: Date;
  rating: number;
  comments: String;
  quantity: number;
}

function Product({ addToCart }: any) {
  const [product, setProduct] = useState<productTypes>();
  const { userDetails } = useRetrieveDetails();
  const [click, setClick] = useState(false);
  const [ratingChoice, setRatingChoice] = useState<number | String>("recent");
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
  }, [ratingChoice]);
  const { productid } = useParams();
  return (
    <>
      {login || userDetails?.userId ? <Navbar /> : <NavbarNoLogin />}
      {
        <div key={product?.id}>
          <ul>
            <li>Item Name: {product?.itemName}</li>
            <li>Price: ${product?.price}</li>
            <li>Category: {product?.category}</li>
            <li>Description: {product?.description}</li>
            <li>Review by buyers: {product?.rating}/5</li>
          </ul>
          <img src={product?.imageUrl} />
          {userDetails?.userId ? (
            <div>
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
              <button
                className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
              >
                Like
              </button>
            </div>
          ) : (
            ""
          )}
          Ratings{" "}
          {[5, 4, 3, 2, 1].map((item) => (
            <div>
              <button
                key={item}
                onClick={() => setRatingChoice(item)}
                className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
              >
                {item}
              </button>
            </div>
          ))}
          <button
            onClick={() => setRatingChoice("recent")}
            className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
          >
            Most Recent
          </button>
          <button
            onClick={() => setRatingChoice("helpful")}
            className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
          >
            Most Helpful
          </button>
          <button
            onClick={() => setRatingChoice("critical")}
            className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
          >
            Most Critical
          </button>
          <table className="table-auto">
            <thead>
              <tr>
                <th>Date reviewed</th>
                <th>Quantity purchased</th>
                <th>Rating</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {product?.reviews.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{convertDateToString(item.reviewedAt)}</td>
                    <td>{item.quantity}</td>
                    <td>{item.rating}</td>
                    <td>{item.comments}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
    </>
  );
}

export default Product;
