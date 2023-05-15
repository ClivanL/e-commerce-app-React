import { useEffect, useState } from "react";
import { UserDetails } from "../../interfaces";

export default function useRetrieveDetails(refresh?:any) {
  const [userDetails, setUserDetails] = useState<UserDetails>();
  useEffect(() => {
    fetch(`http://localhost:15555/api/main/retrieveAccountDetails`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      });
  }, [refresh]);
  return {userDetails, setUserDetails};
}
