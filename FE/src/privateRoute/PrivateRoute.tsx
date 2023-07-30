import { ReactElement, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ForbiddenAuth from "../pages/ForbiddenAuth";
import { getRefreshToken } from "../utils/cookie";
import { useState } from "react";
import { useAccessTokenState } from "../context/loginContext";

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  requireAuth: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 안해야만 접속 가능
}

export function PrivateRoute({ requireAuth }: PrivateRouteProps): React.ReactElement | null {
  const { accessToken } = useAccessTokenState();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (getRefreshToken()) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [accessToken]);

  //FIXME: requireAuth
  if (false) {
    // 인증이 반드시 필요한 페이지인 경우
    return isLogin ? <Outlet /> : <ForbiddenAuth />;
  } else {
    // 인증이 반드시 없어야 하는 페이지인 경우
    return isLogin ? <ForbiddenAuth /> : <Outlet />;
  }
}

export default PrivateRoute;
