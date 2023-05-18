import Navbar from "../components/Navbar";
import useRetrieveSaleHistory from "../hooks/useRetrieveSaleHistory";
import UserNotLoggedIn from "./UserNotLoggedIn";
import convertDateToString from "../functions/convertDateToString";
import { useContext, useState } from "react";
import { LoginContext } from "../App";
import useRetrieveDetails from "../hooks/useRetrieveDetails";


export default function SaleHistory() {
  const [update, setUpdate] = useState(false);
  const { saleHistory } = useRetrieveSaleHistory(update);
  const {userDetails} = useRetrieveDetails();

  const login = useContext(LoginContext);
  const handleConfirm = (id: number) => {
    var resp: any;
    fetch(`http://localhost:15555/api/main/purchaseLog/sentOut/${id}`, {
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
      {login || saleHistory ? (
        <div>
          <Navbar balance={userDetails?.balance!}/>
          Sale history shown here
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2">Item Name</th>
                <th scope="col" className="px-2 py-2">Price</th>
                <th scope="col" className="px-2 py-2">Quantity</th>
                <th scope="col" className="px-2 py-2">Sale Date & Time</th>
                <th scope="col" className="px-2 py-2">Purchased by:</th>
                <th scope="col" className="px-2 py-2">Item sent out?</th>
                <th scope="col" className="px-2 py-2">Review Date</th>
                <th scope="col" className="px-2 py-2">Rating</th>
                <th scope="col" className="px-14 py-2">Comments</th>
              </tr>
              </thead>
              <tbody>
              {saleHistory?.map((element) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={element.id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{element.item.itemName}</th>
                    <td className="px-2 py-2">{element.item.price}</td>
                    <td className="px-2 py-2">{element.quantity}</td>
                    <td className="px-2 py-2">{convertDateToString(element.createdAt)}</td>
                    <td className="px-2 py-2">{element.userUsername}</td>
                    <td className="px-2 py-2">
                      {element.sent ? (
                        <button className="bg-green-400 rounded text-sm border-black border w-16 h-6 font-bold">
                          Sent!
                        </button>
                      ) : (
                        <button
                          className="bg-blue-800 rounded text-sm border-black border w-16 h-6 font-bold"
                          onClick={() => handleConfirm(element.id)}
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                    {element.reviewedAt ? (
                      <td className="px-2 py-2">{convertDateToString(element.reviewedAt)}</td>
                    ) : (
                      ""
                    )}
                    {element.rating ? <td className="px-2 py-2">{element.rating}</td> : ""}
                    {element.comments ? <td className="px-14 py-2">{element.comments}</td> : ""}
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
