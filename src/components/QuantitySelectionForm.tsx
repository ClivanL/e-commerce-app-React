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
        <input className="border border-indigo-500 rounded mb-1" type="number" id="quantity" name="quantity"></input>
        <button className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500'>Confirm</button>
    </form>
    </>
}