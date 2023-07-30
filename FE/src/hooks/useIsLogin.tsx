import { useState, useEffect } from "react";
import { getRefreshToken } from "../utils/cookie";
import { useAccessTokenState } from "../context/accessTokenContext";

function useIsLogin() {
  const [isLogin, setIsLogin] = useState(!!getRefreshToken());
  const { accessToken } = useAccessTokenState();
  useEffect(() => {
    setIsLogin(!!getRefreshToken());
  }, [accessToken]);
  return isLogin;
}

export default useIsLogin;
