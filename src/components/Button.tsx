import {useNavigate} from "react-router-dom"

const Button = (props:any) => {

    const navigate=useNavigate()
    const moveToPage=(dest:String)=>{
        navigate(`/${dest}`)
    }
    return (
      <button onClick={()=>moveToPage(props.dest)} className='bg-indigo-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
      duration-500'>
        {props.label}
      </button>
    )
  }
  
  export default Button