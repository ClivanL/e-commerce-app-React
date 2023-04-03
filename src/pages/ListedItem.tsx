import { useState } from "react";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";

const QuantityAmendForm = (props: any) => {
  return (
    <>
      <form>
        <input
          id="quantity"
          type="number"
          value={props.quantity}
          onChange={(e) => props.setQuantity(e.target.value)}
        />
      </form>
    </>
  );
};

export default function ListedItem() {
  const { userDetails, setUserDetails } = useRetrieveDetails();
  const [selection, setSelection] = useState(0);
  const [click, setClick] = useState(false);
  const [quantity, setQuantity]=useState(0);
  const [currentQuantity,setCurrentQuantity]=useState(0)
  const handleAmend = (id: number, quantity:number) => {
    setSelection(id);
    setClick(true);
    setCurrentQuantity(quantity);
    setQuantity(quantity);
  };
  const handleConfirm = (id: number) => {
    console.log(`confirm alr la, i am changing item ${id} to a quantity of ${quantity}`);
    //send quantity and id down to backend, amend quantity based on id, and then refetch the entire main up to update userDetails.
    setClick(false);
    setSelection(0);
  };
  return (
    <>
      <Navbar />
      Listed Items here
      {click===true?<p>New quantity must be more than {currentQuantity}</p>:""}
      <table>
        <tbody>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity remaining</th>
            <th>Amend quantity</th>
          </tr>
          {userDetails?.listedItems?.map((element) => {
            return (
              <tr>
                <td>{element.itemName}</td>
                <td>{element.price}</td>
                <td>{element.description}</td>
                <td>{element.category}</td>
                {selection === element.id && click === true ? (
                  <td>
                    <QuantityAmendForm quantity={quantity} setQuantity={setQuantity} />
                  </td>
                ) : (
                  <td>{element.quantity}</td>
                )}
                <td>
                  {!(selection === element.id && click === true) ? (
                    <button onClick={() => handleAmend(element.id, element.quantity)}>
                      Amend
                    </button>
                  ):(quantity>element.quantity)?(
                    <button onClick={() => handleConfirm(element.id)}>
                      Confirm change
                    </button>
                  ):<button disabled>Confirm change</button>  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
