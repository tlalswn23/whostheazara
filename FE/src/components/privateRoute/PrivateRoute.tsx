import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useIsLoginState } from "../../context/loginContext";

interface PrivateRouteProps {
  children?: ReactElement; // Router.tsx에서 PrivateRoute가 감싸고 있는 Componet Element
  requireAuth: boolean; // true :인증을 반드시 해야하만 접속가능, false : 인증을 반드시 안해야만 접속 가능
}

export function PrivateRoute({ requireAuth }: PrivateRouteProps): React.ReactElement | null {
  const isLogin = useIsLoginState();

  if (requireAuth) {
    // 인증이 반드시 필요한 페이지인 경우
    // TODO: 로그인 되어있지않으면 로그인 해야하는 페이지 따로 만들고 적용하기
    return isLogin ? <Navigate to="/" /> : <Outlet />;
  } else {
    // 인증이 반드시 없어야 하는 페이지인 경우
    return isLogin ? <Outlet /> : <Navigate to="/" />;
  }
}

export default PrivateRoute;
