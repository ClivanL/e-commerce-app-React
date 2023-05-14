import { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import { SaleLog } from "../../interfaces";


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