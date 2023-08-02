import roomUrl from "../url/roomUrl";
import { useAxiosIntercept } from "./useAxiosIntercept";
import { JobSettingContextType } from "../../context/roomSettingContext";

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
      //TODO: 에러처리
      throw error;
    }
  };

  const getRoomList = async () => {
    const url = roomUrl.baseRoomUrl();
    try {
      const res = await interceptAxiosInstance.get(url);
      const roomList = JSON.parse(res.request.response);
      return roomList;
    } catch (error) {
      //TODO: 에러처리
      throw error;
    }
  };

  return {
    createRoom,
    getRoomList,
  };
};
