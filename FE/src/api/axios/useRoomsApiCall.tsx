import roomUrl from "../url/roomUrl";
import { useAxiosIntercept } from "./useAxiosIntercept";
import { JobSettingContextType } from "../../context/roomSettingContext";
import { AxiosError } from "axios";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { toast } from "react-toastify";

export const useRoomsApiCall = () => {
  const interceptAxiosInstance = useAxiosIntercept();
  const createRoom = async (title: string, jobSetting: JobSettingContextType) => {
    const url = roomUrl.baseRoomUrl();
    const payload = { title, jobSetting };
    try {
      const res = await interceptAxiosInstance.post(url, payload);
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

  const getRoomInfo = async (roomCode: string) => {
    const url = roomUrl.searchRoomUrl(roomCode);
    try {
      const res = await interceptAxiosInstance.get(url);
      const roomInfo = res.data;
      return roomInfo;
    } catch (error) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("방 정보가 존재하지 않습니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const delRoom = async (roomCode: string) => {
    const url = roomUrl.searchRoomUrl(roomCode);
    try {
      await interceptAxiosInstance.delete(url);
    } catch (error) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("방 정보가 존재하지 않습니다.");
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
    getRoomInfo,
    delRoom,
  };
};
