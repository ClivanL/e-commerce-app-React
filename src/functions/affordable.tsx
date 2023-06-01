import { Cart, UserDetails } from "../../interfaces";

export default function affordable(balance:number,carts: Cart[]) {
  return (
    balance >=
    carts.reduce((balance, ele) => {
      return balance + ele.quantity * ele.item.price;
    }, 0)
  );
}
