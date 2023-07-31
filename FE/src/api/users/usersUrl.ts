import { BaseUrl } from "../baseUrl";

export default {
  signUp: () => `${BaseUrl}/users/join`,
  sendEmailVerificationCodeWhenSignup: () => `${BaseUrl}/users/email/confirm`,
  sendEmailVerificationCodeWhenResetPw: () => `${BaseUrl}/users/email`,
  login: () => `${BaseUrl}/users/login`,
  resetPw: () => `${BaseUrl}/users/reset-password`,
  changePw: () => `${BaseUrl}/users/change-password`,
  delUser: () => `${BaseUrl}/users/`,
  getMyInfo: () => `${BaseUrl}/users/me`,
  reissueAccessToken: () => `${BaseUrl}/users/refresh-token`,
};
