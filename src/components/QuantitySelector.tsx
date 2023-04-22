import { useState } from "react";

export default function QuantitySelector({ itemId, setClick, userId }: any) {
  const [quantity, setQuantity] = useState(0);
  const handleConfirm = (event: any) => {
    event.preventDefault();
    fetch(`http://localhost:15555/api/main/cart/addToCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        itemId: itemId,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          console.log(data);
          alert("item has been added to cart successfully");
          setClick(false);
        }
      });
  };
  return (
    <>
      <form>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        {quantity>0?<button
          className="bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500"
          onClick={handleConfirm}
        >
          Confirm Quantity
        </button>:<button className="bg-gray-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8" disabled>Confirm Quantity</button>}
      </form>
    </>
  );
}
