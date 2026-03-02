import { getCookie, setCookie, removeCookie } from "typescript-cookie";
import { OtpType } from "@/types/auth.type";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "./constant";

// Token management
export const getAccessToken = (): string | undefined =>
  getCookie(ACCESS_TOKEN_COOKIE);

export const getRefreshToken = (): string | undefined =>
  getCookie(REFRESH_TOKEN_COOKIE);

export const setTokens = (access: string, refresh: string): void => {
  setCookie(ACCESS_TOKEN_COOKIE, access, { secure: false, path: "/" });
  setCookie(REFRESH_TOKEN_COOKIE, refresh, { secure: false, path: "/" });
};

export const clearTokens = (): void => {
  removeCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
  removeCookie(REFRESH_TOKEN_COOKIE, { path: "/" });
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