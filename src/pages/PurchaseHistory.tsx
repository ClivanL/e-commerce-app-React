import Navbar from "../components/Navbar";
import useRetrievePurchaseHistory from "../hooks/useRetrievePurchaseHistory";
import UserNotLoggedIn from "./UserNotLoggedIn";

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

export default function PurchaseHistory() {
  const purchaseHistory = useRetrievePurchaseHistory()!;

  return (
    <>{purchaseHistory?<div>
      <Navbar />
      Purchase History shown here
      <table>
        <tbody>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Purchased Date</th>
          </tr>
          {purchaseHistory?.map((element: Cart) => {
            return <tr key={element.item.quantity}>
              <td>{element.item.itemName}</td>
              <td>{element.item.price}</td>
              <td>{element.quantity}</td>
              <td>To be added</td>
            </tr>;
          })}
        </tbody>
      </table>
      </div>:<UserNotLoggedIn/>}
    </>
  );
}
