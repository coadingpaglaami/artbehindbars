import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { OtpType } from "@/types/auth.type";

// Token management
export const getAccessToken = (): string | undefined =>
  getCookie("accessToken");

export const getRefreshToken = (): string | undefined =>
  getCookie("refreshToken");

export const setTokens = (access: string, refresh: string): void => {
  setCookie("accessToken", access, { secure: false, path: "/" });
  setCookie("refreshToken", refresh, { secure: false, path: "/" });
};

export const clearTokens = (): void => {
  removeCookie("accessToken", { path: "/" });
  removeCookie("refreshToken", { path: "/" });
};

// OTP verification flow management
export const setVerificationEmail = (email: string): void => {
  setCookie("verificationEmail", email, { secure: false, path: "/" });
};

export const getVerificationEmail = (): string | undefined =>
  getCookie("verificationEmail");

export const setOtpType = (type: OtpType): void => {
  setCookie("otpType", type, { secure: false, path: "/" });
};

export const getOtpType = (): OtpType | undefined => {
  const type = getCookie("otpType");
  return type as OtpType | undefined;
};

export const clearVerificationData = (): void => {
  removeCookie("verificationEmail", { path: "/" });
  removeCookie("otpType", { path: "/" });
};