import axios, { AxiosError } from "axios";
import usersUrl from "./usersUrl";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { getRefreshToken, setRefreshToken } from "../../utils/cookie";

export const reissueAccessToken = async (refreshToken: string) => {
  const url = usersUrl.reissueAccessToken();
  const payload = { refreshToken };
  try {
    const res = await axios.post(url, payload);
    const { accessToken, refreshToken } = JSON.parse(res.request.response);
    setRefreshToken(refreshToken);
    const newAccessToken = accessToken;
    return newAccessToken;
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN:
        toast.error("다시 로그인 해주세요.");
        break;
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("이미 탈퇴한 회원입니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const sendEmailVerificationCodeWithSignup = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenSignup();
  const payload = { email };
  try {
    await toast.promise(axios.post(url, payload), {
      pending: "인증코드를 발송중입니다.",
      success: "인증코드가 발송되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.DUPLICATED:
        toast.error("이미 가입된 이메일입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("이메일 형식이 올바르지 않습니다.");
        break;
      case ERROR_CODE_MAP.EXCEEDED_SEND_COUNT:
        toast.error("인증코드 발송 횟수를 초과하였습니다.");
        break;
      case ERROR_CODE_MAP.SERVER_ERROR:
        toast.error("서버 문제로 이메일 전송에 실패했습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const signup = async (email: string, password: string, nickname: string, emailVerificationCode: string) => {
  const url = usersUrl.signUp();
  const payload = { email, password, nickname, emailVerificationCode };
  try {
    await toast.promise(axios.post(url, payload), {
      pending: "회원가입 중입니다.",
      success: "회원가입 되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_VERIFICATION_CODE:
        toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
        break;
      case ERROR_CODE_MAP.DUPLICATED:
        toast.error("이미 가입된 이메일입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("입력 형식이 올바르지 않습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
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
    setRefreshToken(refreshToken);
    return accessToken;
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
        toast.error("비밀번호가 일치하지 않습니다.");
        break;
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("가입되지 않은 이메일입니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const sendEmailVerificationCodeWithResetPw = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenResetPw();
  const payload = { email };
  try {
    await toast.promise(axios.post(url, payload), {
      pending: "인증코드를 발송중입니다.",
      success: "인증코드가 발송되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.EXCEEDED_SEND_COUNT:
        toast.error("인증코드 발송 횟수를 초과하였습니다.");
        break;
      case ERROR_CODE_MAP.SERVER_ERROR:
        toast.error("서버 문제로 이메일 전송에 실패했습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const resetPassword = async (email: string, password: string, emailVerificationCode: string) => {
  const url = usersUrl.resetPw();
  const payload = { email, password, emailVerificationCode };
  try {
    await toast.promise(axios.post(url, payload), {
      pending: "비밀번호를 변경중입니다.",
      success: "비밀번호가 변경되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_VERIFICATION_CODE:
        toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
        break;
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("이미 탈퇴한 회원입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("입력 형식이 올바르지 않습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const changePassword = async (password: string, newPassword: string, accessToken: string) => {
  const url = usersUrl.changePw();
  const payload = { password, newPassword };
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    await toast.promise(axios.patch(url, payload, { headers }), {
      pending: "비밀번호를 변경중입니다.",
      success: "비밀번호가 변경되었습니다.",
    });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const { config } = axiosError;
    const { status, data } = axiosError.response!;
    const { message } = data as { message: string };

    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
        if (message === "Token Has Expired") {
          try {
            const originalRequest = config!;
            const newAccessToken = await reissueAccessToken(getRefreshToken());
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            await axios(originalRequest);
            return newAccessToken;
          } catch (error) {
            break;
          }
        } else {
          toast.error("비밀번호가 일치하지 않습니다.");
          break;
        }
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("이미 탈퇴한 회원입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("비밀번호 형식이 올바르지 않습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const deleteUser = async (password: string, accessToken: string) => {
  const url = usersUrl.delUser();
  const payload = { password };
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    await toast.promise(axios.delete(url, { data: payload, headers }), {
      pending: "회원탈퇴 중입니다.",
      success: "회원탈퇴 되었습니다.",
    });
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    const { config } = axiosError;
    const { status, data } = axiosError.response!;
    const { message } = data as { message: string };

    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
        if (message === "Token Has Expired") {
          try {
            const originalRequest = config!;
            const newAccessToken = await reissueAccessToken(getRefreshToken());
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            await axios(originalRequest);
            return;
          } catch (error) {
            break;
          }
        } else {
          toast.error("비밀번호가 일치하지 않습니다.");
          break;
        }
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("이미 탈퇴한 회원입니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};

export const getMyInfo = async (accessToken: string): Promise<any> => {
  const url = usersUrl.getMyInfo();
  const headers = { Authorization: `Bearer ${accessToken}` };
  try {
    const res = await axios.get(url, { headers });
    const myInfo = JSON.parse(res.request.response);
    return myInfo;
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
          const myInfo = JSON.parse(res.request.response);
          return { myInfo, newAccessToken };
        } catch (error) {
          break;
        }
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("이미 탈퇴한 회원입니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다");
        break;
    }
    throw error;
  }
};
