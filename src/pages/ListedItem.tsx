import { useContext, useState } from "react";
import { LoginContext } from "../App";
import Navbar from "../components/Navbar";
import useRetrieveDetails from "../hooks/useRetrieveDetails";
import UserNotLoggedIn from "./UserNotLoggedIn";

const QuantityAmendForm = (props: any) => {
  return (
    <>
      <form>
        <input
          id="quantity"
          type="number"
          value={props.quantity}
          onChange={(e) => props.setQuantity(parseInt(e.target.value))}
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
  const login = useContext(LoginContext);
  const handleAmend = (id: number, quantity:number) => {
    setSelection(id);
    setClick(true);
    setCurrentQuantity(quantity);
    setQuantity(quantity);
  };
  const handleConfirm = (id: number) => {
    console.log(`confirm alr la, i am changing item ${id} to a quantity of ${quantity}`);
    //send quantity and id down to backend, amend quantity based on id, and then refetch the entire main up to update userDetails.
    var resp:any;

    fetch(`http://localhost:15555/api/main/owner/updateQuantity`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id,
        "quantity":quantity,
      }),
    })
      .then((response) => {
        resp=response;
        return response.json()})
      .then((data) => {
        console.log(resp.status);
        if (resp.status===202){
          setClick(false);
          setSelection(0);
          // setUserDetails to update userDetails which will change the re-render.
          setUserDetails({...userDetails!,listedItems:[...userDetails!.listedItems.map((item)=>{
            if (item.id===id){
              return {...item, quantity:quantity}
            }
              else{
                return {...item}
              }
            
          })]})
        }
        else{
          alert(data.message);
        }
      })

  };
  return (
    <>
      {login||userDetails?.userId?<div><Navbar balance={userDetails?.balance!}/>
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
              <tr key={element.id}>
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
      </table></div>:<UserNotLoggedIn/>}
    </>
  );
}
