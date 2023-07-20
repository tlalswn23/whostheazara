import axios, { AxiosError } from "axios";
import usersUrl from "./usersUrl";
import { toast } from "react-toastify";

export const sendEmailVerificationCodeWithSignup = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenSignup();
  const payload = { email };
  try {
    const res = await toast.promise(axios.post(url, payload), {
      pending: "인증코드를 발송중입니다.",
      success: "인증코드가 발송되었습니다.",
    });
    return res;
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case 429:
          toast.error("인증코드 발송 횟수를 초과하였습니다.");
          break;
        case 409:
          toast.error("이미 가입된 이메일입니다.");
          break;
      }
    }
    return null;
  }
};
export const login = async (email: string, password: string) => {
  const url = usersUrl.login();
  const payload = { email, password };
  try {
    const res = await toast.promise(axios.post(url, payload), {
      pending: "로그인 중입니다.",
      success: "로그인 되었습니다.",
    });
    const { accessToken, refreshToken } = JSON.parse(res.request.response);
    return {
      accessToken,
      refreshToken,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case 401:
          toast.error("비밀번호가 일치하지 않습니다.");
          break;

        case 404:
          toast.error("가입되지 않은 이메일입니다.");
          break;
      }
    }
    return null;
  }
};
export const signup = async (email: string, password: string, nickname: string, emailVerificationCode: string) => {
  const url = usersUrl.signUp();
  const payload = { email, password, nickname, emailVerificationCode };
  try {
    const res = await toast.promise(axios.post(url, payload), {
      pending: "회원가입 중입니다.",
      success: "회원가입 되었습니다.",
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case 400:
          toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
          break;
        case 409:
          toast.error("이미 가입된 이메일입니다.");
          break;
        case 422:
          toast.error("입력 형식이 올바르지 않습니다.");
          break;
      }
    }
    return null;
  }
};

export const sendEmailVerificationCodeWithResetPw = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenResetPw();
  const payload = { email };
  try {
    const res = await toast.promise(axios.post(url, payload), {
      pending: "인증코드를 발송중입니다.",
      success: "인증코드가 발송되었습니다.",
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case 429:
          toast.error("인증코드 발송 횟수를 초과하였습니다.");
          break;
        case 502:
          toast.error("이미 가입된 이메일입니다.");
          break;
      }
    }
    return null;
  }
};

export const resetPassword = async (email: string, password: string, emailVerificationCode: string) => {
  const url = usersUrl.resetPw();
  const payload = { email, password, emailVerificationCode };
  try {
    const res = await toast.promise(axios.post(url, payload), {
      pending: "비밀번호를 변경중입니다.",
      success: "비밀번호가 변경되었습니다.",
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case 400:
          toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
          break;
        case 404:
          toast.error("가입되지 않은 이메일입니다.");
          break;
        case 422:
          toast.error("입력 형식이 올바르지 않습니다.");
          break;
      }
    }
    return null;
  }
};
