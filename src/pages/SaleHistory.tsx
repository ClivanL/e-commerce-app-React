import Navbar from "../components/Navbar";
import useRetrieveSaleHistory from "../hooks/useRetrieveSaleHistory";

export default function SaleHistory(){
    const saleHistory=useRetrieveSaleHistory();
    return <>
    <Navbar/>
    Sale history shown here
    <table>
        <tbody>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sale Date</th>
          </tr>
          {saleHistory?.map((element) => {
            return <tr key={element.item.quantity}>
              <td>{element.item.itemName}</td>
              <td>{element.item.price}</td>
              <td>{element.quantity}</td>
              <td>To be added</td>
            </tr>;
          })}
        </tbody>
      </table>
    </>
}
