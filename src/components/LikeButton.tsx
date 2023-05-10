import { useEffect, useState } from "react";
import { IonIcon } from "react-ion-icon";

interface props{
    userId:number;
    itemId:number;
    like:Boolean;
    setRefresh:any;
    refresh:any;
}

export default function LikeButton({userId,itemId, like, setRefresh, refresh}:props){
    const [click,setClick]=useState(like);
    useEffect(()=>{
        setClick(like);
    },[like])
    const handleClick=()=>{
        var resp:any;
        fetch(`http://localhost:15555/api/main/favourite`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "userId":userId,
              "itemId":itemId
            }),
          })
            .then((response) => {
                resp=response;
                return response.json()
            })
            .then((data) => {
                if (resp.status!==200){
                    alert(data.message);
                }
                else{
                    setClick(!click);
                    setRefresh(!refresh);
                }
            });
        
    }
    return <>
    <span onClick={handleClick} className="text-red-500">{click?<IonIcon name="heart"/>:<IonIcon name="heart-outline"/>}</span>
    </>
}