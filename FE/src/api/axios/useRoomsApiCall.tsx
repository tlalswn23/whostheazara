import roomUrl from "../url/roomUrl";
import { useAxiosIntercept } from "./useAxiosIntercept";
import { AxiosError } from "axios";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { toast } from "react-toastify";
import { JobSettingType } from "../../types/RoomSettingType";

export const useRoomsApiCall = () => {
  const interceptAxiosInstance = useAxiosIntercept();
  const createRoom = async (title: string, jobSetting: JobSettingType, maxUserNum: number) => {
    const url = roomUrl.baseRoomUrl();
    const body = { title, jobSetting, maxUserNum };
    try {
      const res = await interceptAxiosInstance.post(url, body);
      const roomCode = res.data;
      return roomCode;
    } catch (error) {
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

  const getRoomList = async () => {
    const url = roomUrl.baseRoomUrl();
    try {
      const res = await interceptAxiosInstance.get(url);
      const roomList = res.data;
      return roomList;
    } catch (error) {
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

  return {
    createRoom,
    getRoomList,
  };
};
