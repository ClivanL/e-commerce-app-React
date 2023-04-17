import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { useContext, useState } from "react";
import { LoginContext } from "../App";
import UserNotLoggedIn from "./UserNotLoggedIn";
import useRetrievePurchaseHistory from "../hooks/useRetrievePurchaseHistory";

interface Review {
    stars:number;
    comments:string;
}

export default function ReviewPurchase() {
  const { purchaseLogId } = useParams();
  const { purchaseHistory } = useRetrievePurchaseHistory();
  const login = useContext(LoginContext);
  const [review, setReview]=useState<Review>({stars:0,comments:""});
  const handleClick=(event:any)=>{
    event.preventDefault();
    console.log(review);
  }
  return (
    <>
      {login || purchaseHistory? (
        <div>
          <Navbar />
          <p>You are reviewing for {purchaseHistory?.filter((item)=>item.id===parseInt(purchaseLogId!))[0].item.itemName}</p>
          <p>Quantity purchased:  {purchaseHistory?.filter((item)=>item.id===parseInt(purchaseLogId!))[0].quantity}</p>
          <form>
            <div>
            <input type="number" placeholder="Choose number of stars" value={review.stars} onChange={(e)=>setReview({...review, stars:parseInt(e.target.value)})}/>
            </div>
            <div>
            <input type="text" placeholder="enter your comments here" value={review.comments} onChange={(e)=>setReview({...review, comments:e.target.value})}/>
            </div>
            <button onClick={handleClick} className="bg-blue-500 w-auto h-auto text-black hover:bg-blue-900">Give Review</button>
          </form>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
