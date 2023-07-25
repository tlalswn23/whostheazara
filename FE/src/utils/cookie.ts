import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    //FIXME: https로 전환하면 secure: true로 바꿔야함
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
