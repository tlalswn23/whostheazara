import axios, { AxiosError } from "axios";
import usersUrl from "./usersUrl";
import { toast } from "react-toastify";
import CustomErrorClass from "../CustomErrorClass";

export const sendEmailVerificationCodeWithSignup = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenSignup();
  const payload = { email };
  try {
    await axios.post(url, payload);
    toast.success("인증코드가 발송되었습니다.");
  } catch (error: unknown) {
    if (!(error instanceof CustomErrorClass)) {
      return;
    }
    if (!error.response?.status) {
      return;
    }

    const { status } = error.response;
    switch (status) {
      case 429:
        toast.error("인증코드 발송 횟수를 초과하였습니다.");
        break;
      case 502:
        toast.error("이미 가입된 이메일입니다.");
        break;
    }
  }
};
