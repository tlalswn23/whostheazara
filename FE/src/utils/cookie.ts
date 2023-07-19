import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setAccessToken = (accessToken: string) => {
  cookies.set("accessToken", accessToken, {
    path: "/",
  });
};

export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refreshToken", refreshToken, {
    path: "/",
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
