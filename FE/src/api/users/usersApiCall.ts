import axios from "axios";
import usersUrl from "./usersUrl";
import { toast } from "react-toastify";
import CustomErrorClass from "../CustomErrorClass";

export const sendEmailVerificationCodeWithSignup = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenSignup();
  const payload = { email };
  try {
    await axios.post(url, payload);
    toast.success("인증코드가 발송되었습니다.");
    return true;
  } catch (error: unknown) {
    if (!(error instanceof CustomErrorClass)) {
      return null;
    }
    if (!error.response?.status) {
      return null;
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
    return null;
  }
};

export const login = async (email: string, pw: string) => {
  const url = usersUrl.login();
  const payload = { email, pw };
  try {
    await axios.post(url, payload);
    toast.success("로그인 되었습니다.");
    return true;
  } catch (error: unknown) {
    if (!(error instanceof CustomErrorClass)) {
      return null;
    }
    if (!error.response?.status) {
      return null;
    }

    const { status } = error.response;
    switch (status) {
      case 401:
        toast.error("비밀번호가 일치하지 않습니다.");
        break;
      case 404:
        toast.error("가입되지 않은 이메일입니다.");
        break;
    }
  }
};

export const signup = async (email: string, pw: string, nickName: string, verificationCode: string) => {
  const url = usersUrl.signUp();
  const payload = { email, pw, nickName, verificationCode };
  try {
    await axios.post(url, payload);
    toast.success("회원가입이 완료되었습니다.");
    return true;
  } catch (error: unknown) {
    if (!(error instanceof CustomErrorClass)) {
      return null;
    }
    if (!error.response?.status) {
      return null;
    }

    const { status } = error.response;
    switch (status) {
      case 400:
        toast.error("인증코드가 일치하지 않습니다.");
        break;
      case 409:
        toast.error("이미 가입된 이메일입니다.");
        break;
      case 422:
        toast.error("입력 형식이 올바르지 않습니다.");
        break;
    }
    return null;
  }
};
