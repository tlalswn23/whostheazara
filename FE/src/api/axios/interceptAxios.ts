import axios from "axios";
import { baseUrl } from "../url/baseUrl";
import { reissueAccessToken } from "./usersApiCall";
import { AxiosError } from "axios";

// 액세스 토큰을 저장하는 변수입니다.
let accessTokenLocalVar = "";

// 액세스 토큰을 설정하는 함수입니다.
const setAccessTokenLocalVar = (token: string) => {
  accessTokenLocalVar = token;
};

// Axios 인스턴스를 생성합니다.
const interceptAxiosInstance = axios.create({
  baseURL: baseUrl,
});

// 요청 인터셉터를 설정합니다.
interceptAxiosInstance.interceptors.request.use(
  (config) => {
    if (accessTokenLocalVar) {
      config.headers["Authorization"] = `Bearer ${accessTokenLocalVar}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터를 설정합니다.
interceptAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: unknown) => {
    const axiosError = error as AxiosError;
    const { config } = axiosError;
    const { data } = axiosError.response!;
    const { message } = data as { message: string };

    // 액세스 토큰이 만료된 경우 새로운 액세스 토큰을 요청합니다.
    if (message === "Token Has Expired") {
      const originalRequest = config!;
      const newAccessToken = await reissueAccessToken();
      setAccessTokenLocalVar(newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return interceptAxiosInstance(originalRequest);
    }
    throw error;
  }
);

export default interceptAxiosInstance;
export { accessTokenLocalVar, setAccessTokenLocalVar };
