import { useContext } from "react";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { CheckOutContext, LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import UserNotLoggedIn from "./UserNotLoggedIn";
import { IonIcon } from "react-ion-icon";
import { Cart } from "../../interfaces";
import affordable from "../functions/affordable";

function MyCart() {
  const { userDetails, setUserDetails } = useRetrieveDetails();
  const navigate = useNavigate();
  const { setCheckOut } = useContext(CheckOutContext);
  const login = useContext(LoginContext);

  const handleCheckOut = () => {
    var resp: any;
    fetch(`http://localhost:15555/api/main/axon/cart/checkOutCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        resp = response;
        return response.json();
      })
      .then((data) => {
        console.log(resp.status);
        if (resp.status === 200) {
          setCheckOut(userDetails?.carts);
          setUserDetails({ ...userDetails!, carts: [] });
          navigate("/checkout");
        } else {
          alert(data.message);
        }
      });
  };
  const handleQuantityChange = (choice: String, itemId: number) => {
    const newCart: Cart[] = [];
    userDetails?.carts?.map((ele) => {
      if (ele.item.id === itemId) {
        if (choice === "-") {
          if (ele.quantity - 1 > 0) {
            newCart.push({
              ...ele,
              quantity: ele.quantity - 1,
              sufficient: ele.item.quantity >= ele.quantity - 1 ? true : false,
            });
          }
        } else {
          newCart.push({
            ...ele,
            quantity: ele.quantity + 1,
            sufficient: ele.item.quantity >= ele.quantity + 1 ? true : false,
          });
        }
      } else {
        newCart.push({ ...ele });
      }
    });
    if (newCart) {
      setUserDetails({
        ...userDetails!,
        carts: newCart,
        fulfillableCart:
          newCart.filter((item) => !item.sufficient).length > 0 ? false : true,
      });
    }
  };

  const handleDeleteItem = (cartId: number) => {
    const newCart: Cart[] = [];
    userDetails?.carts?.map((ele) => {
      if (ele.id !== cartId) {
        newCart.push({ ...ele });
      }
    });
    fetch(`http://localhost:15555/api/main/cart/${cartId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setUserDetails({
      ...userDetails!,
      carts: newCart,
      fulfillableCart:
        newCart.filter((item) => !item.sufficient).length > 0 ? false : true,
    });
  };
  return (
    <>
      {login || userDetails?.userId ? (
        <div>
          <Navbar balance={userDetails?.balance!} />
          <div className="text-3xl mb-2 font-extrabold">
            <IonIcon name="cart" /> My cart
          </div>
          {userDetails?.carts.length! > 0 ? (
            <div>
              <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-2 py-2">
                        Item
                      </th>
                      <th scope="col" className="px-2 py-2">
                        Price
                      </th>
                      <th scope="col" className="px-2 py-2">
                        Category
                      </th>
                      <th scope="col" className="px-2 py-2">
                        Quantity
                      </th>
                      <th scope="col" className="px-2 py-2">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userDetails?.carts.map((details) => {
                      return (
                        <tr
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          key={details.item.id}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {details.item.itemName}
                          </th>
                          <td className="px-2 py-2">{details.item.price}</td>
                          <td className="px-2 py-2">{details.item.category}</td>
                          <td className="px-2 py-2">
                            <button
                              className="font-bold"
                              onClick={() => {
                                handleQuantityChange("-", details.item.id);
                              }}
                            >
                              -
                            </button>
                            <span
                              className={
                                details.sufficient
                                  ? "text-green-500"
                                  : "text-red-600"
                              }
                            >
                              {details.quantity}
                            </span>
                            <button
                              onClick={() => {
                                handleQuantityChange("+", details.item.id);
                              }}
                            >
                              +
                            </button>
                          </td>
                          <td className="px-2 py-2 hover:text-red-500">
                            <button
                              onClick={() => handleDeleteItem(details.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-10">
                {userDetails?.fulfillableCart &&
                userDetails?.carts.filter((ele) => !ele.sufficient).length ===
                  0 &&
                affordable(userDetails!) ? (
                  <button
                    className="bg-green-500 text-2xl px-2 py-1 w-auto h-auto border-spacing-3 border rounded hover:bg-green-600"
                    onClick={handleCheckOut}
                  >
                    Check out
                  </button>
                ) : (
                  <div>
                    <button
                      className="bg-gray-600 text-2xl px-2 py-1 w-auto h-auto border-spacing-3 border border-black rounded"
                      disabled
                    >
                      Check Out
                    </button>
                    {!userDetails?.fulfillableCart &&
                    !(
                      userDetails?.carts.filter((ele) => !ele.sufficient)
                        .length === 0
                    ) &&
                    !affordable(userDetails!) ? (
                      <div>
                        <p className="text-red-600 px-2 py-1 text-xs">
                          Cart cannot be fulfilled, insufficient quantity!
                        </p>
                        <p className="text-red-600 px-2 py-1 text-xs">
                          Insufficient funds in account!
                        </p>
                      </div>
                    ) : affordable(userDetails!) ? (
                      <p className="text-red-600 px-2 py-1 text-xs">
                        Cart cannot be fulfilled, insufficient quantity!
                      </p>
                    ) : (
                      <p className="text-red-600 px-2 py-1 text-xs">
                        Insufficient funds in account!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <p>Your cart is empty!</p>
              <p
                className="font-thin text-blue-800 hover:text-blue-500"
                onClick={() => navigate("/category")}
              >
                Click here to start browsing!
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

export default MyCart;
