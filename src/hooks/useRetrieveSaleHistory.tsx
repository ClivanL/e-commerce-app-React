import { ReactComponentElement, ReactElement, useEffect, useState } from "react";

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
  
  interface SaleLog {
    id:number;
    userId:number;
    itemId:number;
    quantity:number;
    item:Item;
    createdAt:Date;
    userUsername:String;
    sent:Boolean;
  }


export default function useRetrieveSaleHistory(update:Boolean){
    const [saleHistory, setSaleHistory] = useState<SaleLog[]>();
    var resp:any;
    useEffect(() => {
      fetch(`http://localhost:15555/api/main/retrieveSaleHistory`, {
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
          console.log(resp.status)
          if (resp.status===200){
            console.log(data);
            setSaleHistory(data);
          }
        });
    }, [update]);
    return {saleHistory, setSaleHistory};
}