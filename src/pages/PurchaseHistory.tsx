import Navbar from "../components/Navbar";
import useRetrievePurchaseHistory from "../hooks/useRetrievePurchaseHistory";
import UserNotLoggedIn from "./UserNotLoggedIn";
import convertDateToString from "../functions/convertDateToString";
import { useContext, useState } from "react";
import { LoginContext } from "../App";
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";

interface Item {
  id: number;
  itemName: String;
  price: number;
  description: String;
  imageUrl: String;
  category: String;
  ownerId: number;
  quantity: number;
}

interface PurchaseLog {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
  item: Item;
  createdAt: Date;
  ownerUsername: String;
  sent: Boolean;
  received: Boolean;
  reviewedAt: Date;
  rating: number;
  comments: String;
}

export default function PurchaseHistory() {
  const [update, setUpdate] = useState(false);
  const { purchaseHistory, setPurchaseHistory } =
    useRetrievePurchaseHistory(update);
  const login = useContext(LoginContext);
  const navigate = useNavigate();
  const handleReceived = (id: number) => {
    var resp: any;
    fetch(`http://localhost:15555/api/main/purchaseLog/received/${id}`, {
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
        console.log(resp.status);
        if (resp.status === 200) {
          setUpdate(!update);
        } else {
          alert(data.message);
        }
      });
  };

  return (
    <>
      {login || purchaseHistory ? (
        <div>
          <Navbar />
          Purchase History shown here
          <table>
            <tbody>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Purchased Date & Time</th>
                <th>Purchased From:</th>
                <th>Item sent out</th>
                <th>Item Received?</th>
                <th>Review</th>
                <th>Review Date</th>
                <th>Rating</th>
                <th>Comments</th>
              </tr>
              {purchaseHistory?.map((element: PurchaseLog) => {
                return (
                  <tr key={element.item.quantity}>
                    <td>{element.item.itemName}</td>
                    <td>{element.item.price}</td>
                    <td>{element.quantity}</td>
                    <td>{convertDateToString(element.createdAt)}</td>
                    <td>{element.ownerUsername}</td>
                    <td>
                      {element.sent ? (
                        <span className="bg-green-400 rounded border-black border text-sm w-16 h-6 font-bold">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-red-600 rounded border-black border text-sm w-16 h-6 font-bold">
                          No
                        </span>
                      )}
                    </td>
                    <td>
                      {!element.sent ? (
                        <button
                          disabled
                          className="bg-gray-700 rounded border-black border text-sm w-16 h-6 font-bold"
                        >
                          Confirm
                        </button>
                      ) : element.received ? (
                        <button className="bg-green-400 rounded border-black border text-sm w-16 h-6 font-bold">
                          Received!
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReceived(element.id)}
                          className="bg-blue-600 rounded border-black border text-sm w-16 h-6 font-bold"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                    {/* <td><button className={`bg-white rounded border-black border text-sm w-auto h-6 font-bold ${element.received? "hover:text-teal-600":""}`}><IonIcon name="pencil-sharp"/>Write a review</button>(WIP)</td> */}
                    <td>
                      {!element.received ? (
                        <button className="bg-white rounded border-black border text-sm w-auto h-6 font-bold hover:text-teal-600">
                          <IonIcon name="pencil-sharp" />
                          Write a review
                        </button>
                      ) : !element.reviewedAt ? (
                        <button
                          onClick={() => navigate(`/review/new/${element.id}`)}
                          className="bg-white rounded border-black border text-sm w-auto h-6 font-bold hover:text-teal-600"
                        >
                          <IonIcon name="pencil-sharp" />
                          Write a review
                        </button>
                      ) : (
                        <span className="bg-green-400 rounded border-black border text-sm w-16 h-6 font-bold">
                          Review given!
                        </span>
                      )}
                    </td>
                    {element.reviewedAt ? (
                      <td>{convertDateToString(element.reviewedAt)}</td>
                    ) : (
                      ""
                    )}
                    {element.rating ? <td>{element.rating}</td> : ""}
                    {element.comments ? <td>{element.comments}</td> : ""}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
