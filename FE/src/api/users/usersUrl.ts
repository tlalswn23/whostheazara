import { httpBaseUrl } from "../baseUrl";

export default {
  signUp: () => `${httpBaseUrl}/users/join`,
  sendEmailVerificationCodeWhenSignup: () => `${httpBaseUrl}/users/email/confirm`,
  sendEmailVerificationCodeWhenResetPw: () => `${httpBaseUrl}/users/email`,
  login: () => `${httpBaseUrl}/users/login`,
  resetPw: () => `${httpBaseUrl}/users/reset-password`,
  changePw: () => `${httpBaseUrl}/users/change-password`,
  delUser: () => `${httpBaseUrl}/users/`,
  getMyInfo: () => `${httpBaseUrl}/users/me`,
  reissueAccessToken: () => `${httpBaseUrl}/users/refresh-token`,
};
