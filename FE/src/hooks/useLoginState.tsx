import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/cookie";

function useLoginState(): boolean {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    getAccessToken();

    if (getAccessToken()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [getAccessToken()]);

  return isLogin;
}

export default useLoginState;
