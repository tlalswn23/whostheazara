import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

function useLoginState(): boolean {
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    if (accessToken) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  return isLogin;
}

export default useLoginState;
