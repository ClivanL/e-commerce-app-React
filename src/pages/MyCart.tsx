import { useContext } from "react";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import NavbarNoLogin from "../components/NavbarNoLogin";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import { CheckOutContext } from "../App";
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

interface Cart {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
  item: Item;
}

function MyCart({ cart }: any) {
  const { userDetails, setUserDetails } = useRetrieveDetails();
  // const [cartDetails, setCartDetails]=useState((userDetails)?[...userDetails?.carts]:[]);
  const navigate = useNavigate();
  const { setCheckOut } = useContext(CheckOutContext);

  const handleCheckOut = () => {
    console.log("Check out");
    fetch(`http://localhost:15555/api/main/cart/checkOutCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          setCheckOut(userDetails?.carts);
          setUserDetails(data);
          navigate("/checkout");
        } else {
          console.log("transaction failed");
          alert("Transaction failed, insufficient quantity");
        }
      });
  };
  const handleQuantityChange = (choice: String, itemId: number) => {
    const newCart: Cart[] = [];
    userDetails?.carts?.map((ele) => {
      if (ele.item.id === itemId) {
        if (choice === "-") {
          newCart.push({ ...ele, quantity: ele.quantity - 1 });
        } else {
          newCart.push({ ...ele, quantity: ele.quantity + 1 });
        }
      } else {
        newCart.push({ ...ele });
      }
    });
    if (newCart) {
      setUserDetails({ ...userDetails!, carts: newCart });
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
    setUserDetails({ ...userDetails!, carts: newCart });
  };
  return (
    <>
      {userDetails?.userId ? (
        <div>
          <Navbar />
          <h1>My cart</h1>
          <table>
            <tbody>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
              {userDetails?.carts?.map((details: any) => (
                <tr key={details.item.description}>
                  <td>{details.item.itemName}</td>
                  <td>{details.item.price}</td>
                  <td>{details.item.category}</td>
                  <td>
                    <button
                      onClick={() => {
                        handleQuantityChange("-", details.item.id);
                      }}
                    >
                      -
                    </button>
                    {details.quantity}
                    <button
                      onClick={() => {
                        handleQuantityChange("+", details.item.id);
                      }}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteItem(details.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleCheckOut}>Check out</button>
        </div>
      ) : (
        <div>
          <NavbarNoLogin />
          <h1>You are not logged in. Please log in. </h1>
          <Button label="Go to login page" dest="login" />
        </div>
      )}
    </>
  );
}

export default MyCart;
