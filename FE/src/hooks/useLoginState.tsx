import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function useLoginState(): boolean {
  const [isLogin, setIsLogin] = useState(false);
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    console.log("useLoginState: ", cookies.accessToken);
    if (cookies.accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [cookies]);

  return isLogin;
}

export default useLoginState;
