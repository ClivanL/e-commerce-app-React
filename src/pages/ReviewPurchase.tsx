import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { useContext, useState } from "react";
import { LoginContext } from "../App";
import UserNotLoggedIn from "./UserNotLoggedIn";
import useRetrievePurchaseHistory from "../hooks/useRetrievePurchaseHistory";

interface Review {
  rating: number;
  comments: string;
}

export default function ReviewPurchase() {
  const { purchaseLogId } = useParams();
  const { purchaseHistory } = useRetrievePurchaseHistory();
  const navigate = useNavigate();
  const login = useContext(LoginContext);
  const [review, setReview] = useState<Review>({ rating: 0, comments: "" });
  const handleClick = (event: any) => {
    event.preventDefault();
    var resp: any;
    console.log(review);
    fetch(`http://localhost:15555/api/main/review/${purchaseLogId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((response) => {
        resp = response;
        return response.json();
      })
      .then((data) => {
        console.log(resp.status);
        if (resp.status === 200) {
          navigate("/purchasehistory");
        }
        alert(data.message);
      });
  };
  return (
    <>
      {login || purchaseHistory ? (
        <div>
          <Navbar />
          <p>
            You are reviewing for{" "}
            {
              purchaseHistory?.filter(
                (item) => item.id === parseInt(purchaseLogId!)
              )[0].item.itemName
            }
          </p>
          <p>
            Quantity purchased:{" "}
            {
              purchaseHistory?.filter(
                (item) => item.id === parseInt(purchaseLogId!)
              )[0].quantity
            }
          </p>
          <form>
            {/* <div>
            Ratings:
            <input type="number" placeholder="Choose number of stars" value={review.rating} onChange={(e)=>setReview({...review, rating:parseInt(e.target.value)})}/>
            </div> */}
            <div>
            <label>Rating:</label>
            <select value={review.rating} onChange={(e)=>setReview({...review, rating:parseInt(e.target.value)})}>
              <option>Choose number of stars</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            </div>
            <div>
              <label>
              Comments:
              </label>
              <input
                type="text"
                placeholder="enter your comments here"
                value={review.comments}
                onChange={(e) =>
                  setReview({ ...review, comments: e.target.value })
                }
              />
            </div>
            <button
              onClick={handleClick}
              className="bg-blue-500 w-auto h-auto rounded border border-black text-black hover:bg-blue-900"
            >
              Give Review
            </button>
          </form>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
