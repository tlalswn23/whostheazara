import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { reissueAccessToken } from "../api/axios/usersApiCall";
import { useAccessTokenState } from "../context/accessTokenContext";
import { ERROR_CODE_MAP } from "../constants/error/ErrorCodeMap";

export const useFetchAccessToken = () => {
  const { setAccessToken } = useAccessTokenState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const newAccessToken = await reissueAccessToken();
        setAccessToken(newAccessToken);
      } catch (error: unknown) {
        const { status } = (error as AxiosError).response!;
        switch (status) {
          case ERROR_CODE_MAP.NO_COOKIE:
            console.log("no cookie");
            return;
          case ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN:
            toast.error("다시 로그인 해주세요.");
            navigate("/");
            break;
          case ERROR_CODE_MAP.NOT_FOUND:
            toast.error("이미 탈퇴한 회원입니다.");
            break;
          default:
            toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
            break;
        }
        throw error;
      }
    })();
  }, []);
};
