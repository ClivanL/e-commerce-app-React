import { IonIcon } from "react-ion-icon";

interface props{
    rating:number
}


export default function RatingDisplay({rating}:props){
    const generateDisplay=(rating:number)=>{
        const display=[]
        let stars=5;
        while(rating>=1){
            display.push(<IonIcon key={stars} name="star"/>)
            rating-=1;
            stars-=1;         
        }
        if (Math.floor(rating)!==rating){
            display.push(<IonIcon key={stars} name="star-half-outline"/>);
            stars-=1;
        }
        while(stars>0){
            display.push(<IonIcon key={stars} name="star-outline"/>);
            stars-=1;       
        }
        return display;
    }
    return <>
            <span className="text-yellow-400">{generateDisplay(rating)}</span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{rating}</span>
    </>
}