import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    // secure: true, 하면 https에서만 쿠키가 전송됨
    httpOnly: true,
  });
};

export const getRefreshToken = () => {
  return cookies.get("refreshToken");
};

export const removeRefreshToken = () => {
  cookies.remove("refreshToken");
};
