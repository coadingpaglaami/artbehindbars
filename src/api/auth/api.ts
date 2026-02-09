import axios from "@/lib/axios";
import {
  SignUpDtoRequestDto,
  LoginRequestDto,
  ForgetPasswordRequestDto,
  OTPRequestDto,
  ResetPasswordRequestDto,
  RefreshTokenRequestDto,
  SignUpResponseDto,
  LoginResponseDto,
  ForgetPasswordResponseDto,
  OTPResponseDto,
  ResetPasswordResponseDto,
  RefreshTokenResponseDto,
} from "@/types/auth.type";

const AUTH = "auth";

/* -------- Signup -------- */

export const signup = async (
  payload: SignUpDtoRequestDto
): Promise<SignUpResponseDto> => {
  const { data } = await axios.post<SignUpResponseDto>(
    `/${AUTH}/signup`,
    payload
  );

  return data;
};

export const signupEmailVerify = async (
  payload: OTPRequestDto
): Promise<OTPResponseDto> => {
  const { data } = await axios.post<OTPResponseDto>(
    `/${AUTH}/signup/email_verify`,
    payload
  );

  return data;
};

/* -------- Signin -------- */

export const signin = async (
  payload: LoginRequestDto
): Promise<LoginResponseDto> => {
  const { data } = await axios.post<LoginResponseDto>(
    `/${AUTH}/signin`,
    payload
  );

  return data;
};

/* -------- Forget Password -------- */

export const forgetPassword = async (
  payload: ForgetPasswordRequestDto
): Promise<ForgetPasswordResponseDto> => {
  const { data } = await axios.post<ForgetPasswordResponseDto>(
    `/${AUTH}/forget-passsword`,
    payload
  );

  return data;
};

export const forgetEmailVerify = async (
  payload: OTPRequestDto
): Promise<OTPResponseDto> => {
  const { data } = await axios.post<OTPResponseDto>(
    `/${AUTH}/forget/email_verify`,
    payload
  );

  return data;
};

/* -------- Reset Password -------- */

export const resetPassword = async (
  payload: ResetPasswordRequestDto
): Promise<ResetPasswordResponseDto> => {
  const { data } = await axios.post<ResetPasswordResponseDto>(
    `/${AUTH}/reset-password`,
    payload
  );

  return data;
};

/* -------- Refresh Token -------- */

export const refreshToken = async (
  payload: RefreshTokenRequestDto
): Promise<RefreshTokenResponseDto> => {
  const { data } = await axios.post<RefreshTokenResponseDto>(
    `/${AUTH}/refresh_token`,
    payload
  );

  return data;
};

/* -------- Google OAuth -------- */

export const googleAuth = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};
