import { IonIcon } from "react-ion-icon";

interface Props {
  rating: number;
  setRatingChoice: any;
}

export default function StarsButton({ rating, setRatingChoice }: Props) {
  const printStars = (rating: any) => {
    let count = 5;
    let result = [];
    while (rating > 0) {
      count -= 1;
      rating -= 1;
      result.push(<IonIcon name="star" />);
    }
    while (count > 0) {
      count -= 1;
      result.push(<IonIcon name="star-outline" />);
    }

    return result;
  };
  return (
    <>
      <button
        className="bg-orange-700 text-white font-[Poppins] py-1 px-1 rounded border hover:bg-orange-400 duration-500"
        onClick={() => setRatingChoice(rating)}
      >
        {printStars(rating)}
      </button>
    </>
  );
}
