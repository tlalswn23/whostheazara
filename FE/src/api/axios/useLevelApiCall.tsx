import { useAxiosIntercept } from "./useAxiosIntercept";
import usersUrl from "../url/usersUrl";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { AxiosError } from "axios";

export const useLevelApiCall = () => {
  const interceptAxiosInstance = useAxiosIntercept();
  const getLevelAndExp = async () => {
    const url = usersUrl.getLevel();
    try {
      const res = await interceptAxiosInstance.get(url);
      const levelAndExpAndMaxExp = res.data;
      return levelAndExpAndMaxExp;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("유저 정보가 존재하지 않습니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  return { getLevelAndExp };
};
