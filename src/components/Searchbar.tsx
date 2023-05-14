import { useState } from "react"
import { useNavigate } from "react-router-dom";

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
    const navigate=useNavigate();
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
    <div className="px-8">
    <form onKeyUp={handleSearch}>
        <input className="text-black rounded px-2 py-1 w-64" id="product" name="product" placeholder="Enter product name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
    </form>
    {
        results?
    <ul className="bg-black rounded">
        {results?.map((item:productTypes)=>{
            return <li className="hover:text-black hover:bg-green-600" onClick={()=>navigate(`/category/${item.category}/${item.id}`)} key={item.id}>{item.itemName}</li>
        })}
    </ul>:""}
    </div>

    </>
}