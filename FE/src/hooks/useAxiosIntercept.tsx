import axios from "axios";
import { AxiosError } from "axios";
import { reissueAccessToken } from "../api/axios/usersApiCall";
import { baseUrl } from "../api/url/baseUrl";
import { useAccessTokenState } from "../context/accessTokenContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useAxiosIntercept = () => {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAccessTokenState();
  // Axios 인스턴스를 생성합니다.
  const interceptAxiosInstance = axios.create({
    baseURL: baseUrl,
  });

  // 요청 인터셉터를 설정합니다.
  interceptAxiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
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
        try {
          const newAccessToken = await reissueAccessToken();
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return interceptAxiosInstance(originalRequest);
        } catch (error) {
          const axiosError = error as AxiosError;
          const { data } = axiosError.response!;
          const { message } = data as { message: string };
          //TODO: reissueAccessToken 실패시 처리 추가
          if (message === "Invalid Token") {
            toast.error("다시 로그인 해주세요.");
            navigate("/");
            return;
          }
        }
      }
      throw error;
    }
  );

  return interceptAxiosInstance;
};
