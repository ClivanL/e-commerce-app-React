import { useEffect, useState } from "react";
import { PurchaseLog } from "../../interfaces";

  
export default function useRetrievePurchaseHistory(update?:Boolean) {
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
  