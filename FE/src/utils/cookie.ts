import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken: string) => {
  cookies.set("refreshToken", refreshToken, {
    path: "/",
    secure: true,
    httpOnly: true,
  });
};

export const removeRefreshToken = () => {
  cookies.remove("refreshToken");
};
