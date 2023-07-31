import { useEffect } from "react";
import { reissueAccessToken } from "../api/axios/usersApiCall";
import { useNavigate } from "react-router-dom";
import { ERROR_CODE_MAP } from "../constants/error/ErrorCodeMap";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const useFetchAccessToken = () => {
  const navigate = useNavigate();
  let accessToken = "";
  useEffect(() => {
    (async () => {
      try {
        const newAccessToken = await reissueAccessToken();
        accessToken = newAccessToken;
      } catch (error) {
        console.log(error);
        const { status } = (error as AxiosError).response!;
        //TODO: 빈 리프레쉬 토큰이면 에러 메세지 안띄움
        // if (status === ERROR_CODE_MAP.EMPTY_REFRESH_TOKEN) return;
        if (status === ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN) {
          toast.error("다시 로그인 해주세요.");
          navigate("/home");
        }
      }
    })();
  }, []);

  return accessToken;
};
