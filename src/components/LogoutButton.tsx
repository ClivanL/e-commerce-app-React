import { useNavigate } from "react-router-dom";

const LogoutButton = (props: any) => {
  const navigate = useNavigate();
  const moveToPage = (dest: String) => {
    navigate(`/${dest}`);
  };
  return (
    <button
      onClick={() => {
        props.setLogin(false);
        fetch(`http://localhost:15555/home/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        moveToPage(props.dest);
      }}
      className="bg-gray-600 text-black font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-gray-400 
      duration-500"
    >
      {props.label}
    </button>
  );
};

export default LogoutButton;
