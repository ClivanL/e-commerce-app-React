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
  
  interface PurchaseLog {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item;
    createdAt:Date;
    ownerUsername:String;
    sent:Boolean;
    received:Boolean;
  }

  
export default function useRetrievePurchaseHistory(update:Boolean) {
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseLog[]>();
    var resp:any;
    useEffect(() => {
      fetch(`http://localhost:15555/api/main/retrieveTransactionHistory`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          resp=response;
          return response.json()})
        .then((data) => {
          if (resp.status===200){
            console.log(data);
            setPurchaseHistory(data);
          }
        });
    }, [update]);
    return {purchaseHistory, setPurchaseHistory};
  }
  