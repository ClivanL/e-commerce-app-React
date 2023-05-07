import { useState } from "react";
import { IonIcon } from "react-ion-icon";

interface props{
    userId:number;
    itemId:number;
}

export default function LikeButton({userId,itemId}:props){
    const [click,setClick]=useState(false);
    const handleClick=()=>{
        console.log("userId",userId);
        console.log("itemId",itemId);
        setClick(!click);
    }
    return <>
    <span onClick={handleClick}>{click?<IonIcon name="heart"/>:<IonIcon name="heart-outline"/>}</span>
    </>
}