import { toast } from "react-toastify";
import roomUrl from "../url/roomUrl";
import { AxiosError } from "axios";
import interceptAxiosInstance from "./interceptAxios";

export const createRoom = async (title: string) => {
  const url = roomUrl.createRoom();
  const payload = { title };
  try {
    const res = await toast.promise(interceptAxiosInstance.post(url, payload), {
      pending: "방을 생성중입니다.",
      success: "방이 생성되었습니다.",
    });
    const { roomId } = JSON.parse(res.request.response);
    return roomId;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const { status } = axiosError.response!;
    //TODO: 에러코드 추가
    switch (status) {
      default:
        toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
        break;
    }
    throw error;
  }
};

export const getRoomList = async () => {};
