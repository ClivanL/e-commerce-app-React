import { UserDetails } from "../../interfaces";

export default function affordable(userDetails: UserDetails) {
  return (
    userDetails?.balance >=
    userDetails?.carts.reduce((balance, ele) => {
      return balance + ele.quantity * ele.item.price;
    }, 0)
  );
}
