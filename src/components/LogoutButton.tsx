import { useNavigate } from "react-router-dom";

const LogoutButton = (props: any) => {
  const navigate = useNavigate();
  const moveToPage = () => {
    navigate(`/logout`);
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
        props.setLogin(false);
        moveToPage();
      }}
      className="bg-gray-600 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-gray-400 
      duration-500"
    >
      {props.label}
    </button>
  );
};

export default LogoutButton;
