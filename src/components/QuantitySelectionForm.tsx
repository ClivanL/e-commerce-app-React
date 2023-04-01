export default function QuantitySelectionForm({setSelection, itemId, userId}:any){
    const handleSubmit=(event:any)=>{
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
                quantity: event.target.quantity.value
              })
          })
            .then((response) => response.json())
            .then((data) => {
                if (!data.error){
                    console.log(data);
                    alert("item has been added to cart successfully")
                    setSelection(0);
                }
                else{
                    alert("Add to cart failed, you are not logged in!")
                }

            });
        
    }

    return <>
    <form onSubmit={handleSubmit}>
        <input type="number" id="quantity" name="quantity"></input>
        <button>Confirm</button>
    </form>
    </>
}