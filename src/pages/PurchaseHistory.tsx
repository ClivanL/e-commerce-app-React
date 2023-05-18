import Navbar from "../components/Navbar";
import useRetrievePurchaseHistory from "../hooks/useRetrievePurchaseHistory";
import UserNotLoggedIn from "./UserNotLoggedIn";
import convertDateToString from "../functions/convertDateToString";
import { useContext, useState } from "react";
import { LoginContext } from "../App";
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";
import { PurchaseLog } from "../../interfaces";
import useRetrieveDetails from "../hooks/useRetrieveDetails";

export default function PurchaseHistory() {
  const [update, setUpdate] = useState(false);
  const { purchaseHistory} =
    useRetrievePurchaseHistory(update);
  const {userDetails}=useRetrieveDetails();
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
          <Navbar balance={userDetails?.balance!}/>
          Purchase History shown here
          <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2">Item Name</th>
                <th scope="col" className="px-2 py-2">Price</th>
                <th scope="col" className="px-2 py-2">Quantity</th>
                <th scope="col" className="px-2 py-2">Purchased Date & Time</th>
                <th scope="col" className="px-2 py-2">Purchased From:</th>
                <th scope="col" className="px-2 py-2">Item sent out</th>
                <th scope="col" className="px-2 py-2">Item Received?</th>
                <th scope="col" className="px-2 py-2">Review</th>
                <th scope="col" className="px-2 py-2">Review Date</th>
                <th scope="col" className="px-2 py-2">Rating</th>
                <th scope="col" className="px-10 py-2">Comments</th>
              </tr>
              </thead>
              <tbody>
              {purchaseHistory?.map((element: PurchaseLog) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={element.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.item.itemName}</th>
                    <td className="px-2 py-2">{element.item.price}</td>
                    <td className="px-2 py-2">{element.quantity}</td>
                    <td className="px-2 py-2">{convertDateToString(element.createdAt)}</td>
                    <td className="px-2 py-2">{element.ownerUsername}</td>
                    <td className="px-2 py-2">
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
                    <td className="px-2 py-2">
                      {!element.sent ? (
                        <button
                          disabled
                          className="bg-gray-700 rounded border-black border text-sm w-auto h-auto font-bold"
                        >
                          Confirm
                        </button>
                      ) : element.received ? (
                        <button className="bg-green-400 rounded border-black border text-sm w-auto h-auto font-bold">
                          Received!
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReceived(element.id)}
                          className="bg-blue-600 rounded border-black border text-sm w-auto h-auto font-bold"
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                    {/* <td><button className={`bg-white rounded border-black border text-sm w-auto h-6 font-bold ${element.received? "hover:text-teal-600":""}`}><IonIcon name="pencil-sharp"/>Write a review</button>(WIP)</td> */}
                    <td className="px-2 py-2">
                      {!element.received ? (
                        <button className="bg-white rounded border-black border text-sm w-auto h-auto font-bold hover:text-teal-600">
                          <IonIcon name="pencil-sharp" />
                          Write a review
                        </button>
                      ) : !element.reviewedAt ? (
                        <button
                          onClick={() => navigate(`/review/new/${element.id}`)}
                          className="bg-white rounded border-black border text-sm w-auto h-auto font-bold hover:text-teal-600"
                        >
                          <IonIcon name="pencil-sharp" />
                          Write a review
                        </button>
                      ) : (
                        <span className="bg-green-400 rounded border-black border text-sm w-auto h-auto font-bold">
                          Review given!
                        </span>
                      )}
                    </td>
                    {element.reviewedAt ? (
                      <td className="px-2 py-2">{convertDateToString(element.reviewedAt)}</td>
                    ) : (
                      ""
                    )}
                    {element.rating ? <td className="px-2 py-2">{element.rating}</td> : ""}
                    {element.comments ? <td className="px-10 py-2">{element.comments}</td> : ""}
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
