import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setAccessToken = (accessToken: string) => {
  cookies.set("accessToken", accessToken, {
    path: "/",
    maxAge: 60 * 60,
  });
};

export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
};

export const getAccessToken = () => {
  return cookies.get("accessToken");
};

export const getRefreshToken = () => {
  return cookies.get("refreshToken");
};

export const removeAllToken = () => {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
};
