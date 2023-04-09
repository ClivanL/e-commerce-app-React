import Navbar from "../components/Navbar";
import useRetrievePurchaseHistory from "../hooks/useRetrievePurchaseHistory";
import UserNotLoggedIn from "./UserNotLoggedIn";
import convertDateToString from "../functions/convertDateToString";
import { useContext } from "react";
import { LoginContext } from "../App";
import { IonIcon } from "react-ion-icon";

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
  createdAt:Date;
  ownerUsername:String;
}

export default function PurchaseHistory() {
  const purchaseHistory = useRetrievePurchaseHistory()!;
  const login=useContext(LoginContext);

  return (
    <>{login||purchaseHistory?<div>
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
          </tr>
          {purchaseHistory?.map((element: PurchaseLog) => {
            return <tr key={element.item.quantity}>
              <td>{element.item.itemName}</td>
              <td>{element.item.price}</td>
              <td>{element.quantity}</td>
              <td>{convertDateToString(element.createdAt)}</td>
              <td>{element.ownerUsername}</td>
              <td>Yes/No (WIP)</td>
              <td><button className="bg-green-400 rounded text-sm border-black border text-sm w-16 h-6 font-bold">Confirm</button>(WIP)</td>
              <td><IonIcon name="pencil-sharp"/>(WIP)</td>
            </tr>;
          })}
        </tbody>
      </table>
      </div>:<UserNotLoggedIn/>}
    </>
  );
}
