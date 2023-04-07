import { useState } from "react"

interface productTypes {
    id:number;
    itemName:string,
    price:number,
    quantity:number,
    category:string,
    description:string,
    imageUrl:string,
    ownerId:number
}
export default function Searchbar(){
    const [search, setSearch]=useState("");
    const [results,setResults]=useState<productTypes[]>();
    const handleSearch=()=>{
        var resp:any;
        fetch(`http://localhost:15555/api/main/search/${search}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        resp=response;
        return response.json()})
      .then((data) => {
        if (resp.status===200){
            setResults(data);
        }
       })
    }
    return <>
    <div>
    <form onKeyUp={handleSearch}>
        <input id="product" name="product" placeholder="Enter product name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </form>
    {
        results?
    <ul>
        {results?.map((item:productTypes)=>{
            return <li key={item.id}>{item.itemName}</li>
        })}
    </ul>:""}
    </div>
    </>
}