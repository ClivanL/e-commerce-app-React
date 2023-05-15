import { useState } from "react"
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";
import { Item } from "../../interfaces";

export default function Searchbar(){
    const [search, setSearch]=useState("");
    const [results,setResults]=useState<Item[]>();
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
        <input className="text-black rounded px-2 py-1 w-96" id="product" name="product" placeholder="Enter product name" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <span onClick={()=>{
          setSearch("");
          setResults([]);
          navigate(`/search/${search}`)}} className='px-1 text-2xl hover:text-green-300'><IonIcon name='search-sharp'/></span>
    </form>
    {
        results?
    <ul className="bg-black rounded">
        {results?.map((item:Item)=>{
            return <li className="hover:text-black hover:bg-green-600" onClick={()=>navigate(`/category/${item.category}/${item.id}`)} key={item.id}>{item.itemName}</li>
        })}
    </ul>:""}
    </div>

    </>
}