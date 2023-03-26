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
}

interface UserDetails {
  userId: number,
  email: String;
  carts: Item[];
  name: String;
  username: String;
}

export default function useRetrieveDetails() {
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
        setUserDetails(data);
      });
  }, []);
  return userDetails;
}
