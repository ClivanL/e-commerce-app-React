import Navbar from "../components/Navbar";

function Cart({cart}:any){
    return <>
    <Navbar/>
    <h1>My cart</h1>
    <table>
    <tbody>
    <tr>
        <th>Item</th>
        <th>Price</th>
        <th>Category</th>
    </tr>
    {cart.map((item:any)=>
    <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
    </tr>
    )}
    </tbody>
    </table>
    </>
}

export default Cart;