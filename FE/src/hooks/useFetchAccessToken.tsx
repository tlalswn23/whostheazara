import { useEffect } from "react";
import { reissueAccessToken } from "../api/axios/usersApiCall";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../constants/error/ErrorCodeMap";
import { useAccessTokenState } from "../context/accessTokenContext";

export const useFetchAccessToken = () => {
  const { accessToken, setAccessToken } = useAccessTokenState();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const newAccessToken = await reissueAccessToken();
        setAccessToken(newAccessToken);
      } catch (error: unknown) {
        //TODO: reissueAccessToken 실패시 처리 추가
        const axiosError = error as AxiosError;
        const { data, status } = axiosError.response!;
        const { message } = data as { message: string };
        if (status === ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN) return;
        if (message === "Invalid Token") {
          toast.error("다시 로그인 해주세요.");
          navigate("/");
        }
      }
    })();
  }, [accessToken]);
};
