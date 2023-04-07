export default function convertDateToString(datetime:Date){
    let date=datetime.toString().slice(0,10);
    let time=datetime.toString().slice(11,16);
    return date+" "+time;
}