import { Cart, UserDetails } from "../../interfaces";

export default function calculateTotal(carts:Cart[]){
    return carts.reduce((balance, ele) => {
        return balance + ele.quantity * ele.item.price;
      }, 0)
}