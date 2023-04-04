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
  
  interface Cart {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item
  }

  
export default function useRetrievePurchaseHistory() {
    const [purchaseHistory, setPurchaseHistory] = useState<Cart[]>();
    useEffect(() => {
      fetch(`http://localhost:15555/api/main/retrieveTransactionHistory`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPurchaseHistory(data);
        });
    }, []);
    return purchaseHistory;
  }
  