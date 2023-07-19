import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/cookie";

function useLoginState(): boolean {
  const [isLogin, setIsLogin] = useState(false);
  const accessToken = getAccessToken();

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
