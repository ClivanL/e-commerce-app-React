import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import calculateTotal from "../functions/calculateTotal";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import UserNotLoggedIn from "./UserNotLoggedIn";
import { useContext, useState } from "react";
import { CheckOutContext } from "../App";
import affordable from "../functions/affordable";
import { Cart } from "../../interfaces";

export default function Payment() {
  const { userDetails } = useRetrieveDetails();
  const [paymentChoice, setPaymentChoice] = useState("");
  const navigate = useNavigate();
  const { checkOut } = useContext(CheckOutContext);
  const handlePayment = () => {
    var resp: any;
    fetch(`http://localhost:15555/api/main/axon/cart/checkOutCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userDetails, carts: checkOut }),
    })
      .then((response) => {
        resp = response;
        return response.json();
      })
      .then((data) => {
        console.log(resp.status);
        if (resp.status === 200) {
          //setCheckOut(userDetails?.carts);
          //setUserDetails({ ...userDetails!, carts: [] });
          navigate("/checkout");
        } else {
          alert(data.message);
        }
      });
  };
  return (
    <>
      {userDetails?.userId ? (
        <div>
          <Navbar balance={userDetails.balance} />
          <p className="text-3xl mb-2 font-extrabold">Payment page</p>
          <p>Checking out...</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {checkOut?.map((ele: Cart) => (
                <tr key={ele.id}>
                  <th>{ele.item.itemName}</th>
                  <td>{ele.item.price}</td>
                  <td>{ele.quantity}</td>
                  <td>{ele.item.category}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <span className="font-bold">Total cost: </span>
                </td>
                <td>${calculateTotal(checkOut)}</td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">Payment choice:</span>
                </td>
                <td>
                  <input
                    type="radio"
                    value="account"
                    name="method"
                    onChange={(e) => setPaymentChoice(e.target.value)}
                  />
                  Account balance
                </td>
                <td>
                  <input
                    type="radio"
                    value="card"
                    name="method"
                    onChange={(e) => setPaymentChoice(e.target.value)}
                  />
                  Credit Card
                </td>
              </tr>
            </tbody>
          </table>
          {affordable(userDetails?.balance, checkOut) ||
          paymentChoice === "card" ||
          paymentChoice === "" ? (
            <button
              className="bg-green-500 text-2xl px-2 py-1 w-auto h-auto border-spacing-3 border rounded hover:bg-green-600"
              onClick={handlePayment}
            >
              Confirm payment
            </button>
          ) : (
            <div>
              <button
                className="bg-gray-600 text-2xl px-2 py-1 w-auto h-auto border-spacing-3 border border-black rounded"
                disabled
              >
                Confirm payment
              </button>{" "}
              <p className="text-red-600 px-2 py-1 text-xs">
                Payment cannot proceed, insufficient funds. Please choose a
                different payment method or top up your account!
              </p>
            </div>
          )}
        </div>
      ) : (
        <UserNotLoggedIn />
      )}
    </>
  );
}
