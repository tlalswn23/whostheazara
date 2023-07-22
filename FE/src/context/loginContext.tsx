import { createContext, useContext, useState, useMemo } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

export const AccessTokenContext = createContext({
  accessToken: "",
  setAccessToken: (value: string) => {},
});

export function AccessTokenProvider({ children }: LayoutChildrenProps) {
  const [accessToken, setAccessToken] = useState("");
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(() => ({ accessToken, setAccessToken }), [accessToken, setAccessToken]);
  return <AccessTokenContext.Provider value={value}>{children}</AccessTokenContext.Provider>;
}

export function useAccessTokenState() {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error("Cannot find AccessTokenProvider");
  }
  return {
    accessToken: context.accessToken,
    setAccessToken: context.setAccessToken,
  };
}
