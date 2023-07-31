import { toast } from "react-toastify";
import roomUrl from "./roomUrl";
import axios, { AxiosError } from "axios";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { reissueAccessToken } from "../users/usersApiCall";
import { getRefreshToken } from "../../utils/cookie";

export const createRoom = async (title: string, accessToken: string) => {
  const url = roomUrl.createRoom();
  const payload = { title };
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const res = await toast.promise(axios.post(url, payload, { headers }), {
      pending: "방을 생성중입니다.",
      success: "방이 생성되었습니다.",
    });
    const { roomId } = JSON.parse(res.request.response);
    return { roomId };
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const { config } = axiosError;
    const { status } = axiosError.response!;

    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
        try {
          const originalRequest = config!;
          const newAccessToken = await reissueAccessToken(getRefreshToken());
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          const res = await axios(originalRequest);
          const roomId = JSON.parse(res.request.response);
          return { roomId, newAccessToken };
        } catch (error) {
          break;
        }
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const getRoomList = async () => {};
