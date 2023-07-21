import axios, { AxiosError } from "axios";
import usersUrl from "./usersUrl";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/ErrorCodeMap";
import { getRefreshToken, setAllToken } from "../../utils/cookie";
import { getAccessToken } from "../../utils/cookie";

export const reissueAccessToken = async (refreshToken: string) => {
  const url = usersUrl.reissueAccessToken();
  const payload = { refreshToken };
  try {
    const res = await axios.post(url, payload);
    const { accessToken, refreshToken } = JSON.parse(res.request.response);
    setAllToken(accessToken, refreshToken);
    return true;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN:
          toast.error("다시 로그인 해주세요.");
          return status;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
      }
    }
    return null;
  }
};

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
    if (error instanceof AxiosError) {
      const { status } = error.response!;
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
        case ERROR_CODE_MAP.IN_VALID_VERIFICATION_CODE:
          toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.DUPLICATED:
          toast.error("이미 가입된 이메일입니다.");
          break;
        case ERROR_CODE_MAP.IN_VALID_INPUT:
          toast.error("입력 형식이 올바르지 않습니다.");
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
    setAllToken(accessToken, refreshToken);
    return true;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
          toast.error("비밀번호가 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("가입되지 않은 이메일입니다.");
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
        case ERROR_CODE_MAP.EXCEEDED_SEND_COUNT:
          toast.error("인증코드 발송 횟수를 초과하였습니다.");
          break;
        case ERROR_CODE_MAP.SERVER_ERROR:
          toast.error("서버 문제로 이메일 전송에 실패했습니다.");
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
        case ERROR_CODE_MAP.IN_VALID_VERIFICATION_CODE:
          toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
        case ERROR_CODE_MAP.IN_VALID_INPUT:
          toast.error("입력 형식이 올바르지 않습니다.");
          break;
      }
    }
    return null;
  }
};

export const changePassword = async (password: string, newPassword: string) => {
  const url = usersUrl.changePw();
  const payload = { password, newPassword };
  const headers = { Authorization: `Bearer ${getAccessToken()}` };
  try {
    const res = await toast.promise(axios.patch(url, payload, { headers }), {
      pending: "비밀번호를 변경중입니다.",
      success: "비밀번호가 변경되었습니다.",
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
          if (error.response?.data.message === "Token Has Expired") {
            const originalRequest = error.config!;
            const reissueResult = await reissueAccessToken(getRefreshToken());
            if (reissueResult) {
              originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
              const reChangePasswordResult = await axios(originalRequest);
              if (reChangePasswordResult) {
                toast.success("비밀번호가 변경되었습니다.");
                return reChangePasswordResult;
              }
            }
            return null;
          }
          toast.error("기존 비밀번호가 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
        case ERROR_CODE_MAP.IN_VALID_INPUT:
          toast.error("비밀번호 형식이 올바르지 않습니다.");
          break;
      }
    }
    return null;
  }
};

export const deleteUser = async (password: string) => {
  const url = usersUrl.delUser();
  const payload = { password };
  const headers = { Authorization: `Bearer ${getAccessToken()}` };

  try {
    const res = await toast.promise(axios.delete(url, { data: payload, headers }), {
      pending: "회원탈퇴 중입니다.",
      success: "회원탈퇴 되었습니다.",
    });
    return res;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const { status } = error.response!;
      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD_OR_IN_VALID_ACCESS_TOKEN:
          if (error.response?.data.message === "Token Has Expired") {
            console.log("토큰 만료");
            const originalRequest = error.config!;
            const reissueResult = await reissueAccessToken(getRefreshToken());
            if (reissueResult) {
              console.log("토큰 재발급");
              originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
              const reChangePasswordResult = await axios(originalRequest);
              console.log("재발급된 토큰으로 회원탈퇴 다시 요청");
              if (reChangePasswordResult) {
                console.log("회원탈퇴 성공");
                toast.success("회원탈퇴 되었습니다.");
                return reChangePasswordResult;
              }
            }
            return null;
          } else {
            toast.error("비밀번호가 일치하지 않습니다.");
            break;
          }
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
      }
    }
    return null;
  }
};
