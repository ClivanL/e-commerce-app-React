import { useEffect, useState } from "react";

interface Item {
  id: number;
  itemName: String;
  price: number;
  description: String;
  imageUrl: String;
  category: String;
  ownerId: number;
  quantity: number;
  likes:number;
}

interface Favourite{
  id:number;
  userId:number;
  itemId:number;
  item:Item;
}

interface Cart {
  id:number;
  userId:number;
  itemId:number;
  quantity:number;
  item:Item;
  sufficient:Boolean;
}

interface UserDetails {
  userId: number,
  email: String;
  carts: Cart[];
  name: String;
  username: String;
  listedItems:Item[];
  fulfillableCart:Boolean;
  favourites:Favourite[];
}

export default function useRetrieveDetails(refresh?:any) {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  useEffect(() => {
    fetch(`http://localhost:15555/api/main/retrieveAccountDetails`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserDetails(data);
      });
  }, [refresh]);
  return {userDetails, setUserDetails};
}
