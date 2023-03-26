import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";

function Cart({ cart }: any) {
  const userDetails = useRetrieveDetails();
  return (
    <>
      <Navbar />
      <h1>My cart</h1>
      <table>
        <tbody>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>Category</th>
          <th>Quantity</th>
        </tr>
        {userDetails?.carts?.map((details: any) => (
          <tr key={details.item.description}>
            <td>{details.item.itemName}</td>
            <td>{details.item.price}</td>
            <td>{details.item.category}</td>
            <td>{details.quantity}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default Cart;
