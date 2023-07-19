import { createContext, useContext, useState, useMemo } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { getAccessToken } from "../utils/cookie";

export const IsLoginContext = createContext({
  isLogin: false,
  setIsLogin: (value: boolean) => {},
});

export function IsLoginProvider({ children }: LayoutChildrenProps) {
  const accessToken = getAccessToken();
  const [isLogin, setIsLogin] = useState(accessToken ? true : false);
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ isLogin, setIsLogin }), [isLogin, setIsLogin]);
  return <IsLoginContext.Provider value={value}>{children}</IsLoginContext.Provider>;
}

export function useIsLoginState() {
  const context = useContext(IsLoginContext);
  if (!context) {
    throw new Error("Cannot find IsLoginProvider");
  }
  return {
    isLogin: context.isLogin,
    setIsLogin: context.setIsLogin,
  };
}
