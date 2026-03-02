import { useMutation } from "@tanstack/react-query";
import {
  signup,
  signupEmailVerify,
  signin,
  forgetPassword,
  forgetEmailVerify,
  resetPassword,
  refreshToken,
} from "./api";

import {
  SignUpDtoRequestDto,
  LoginRequestDto,
  ForgetPasswordRequestDto,
  OTPRequestDto,
  ResetPasswordRequestDto,
  RefreshTokenRequestDto,
  SignUpResponseDto,
  LoginResponseDto,
  OTPResponseDto,
  ForgetPasswordResponseDto,
  ResetPasswordResponseDto,
  RefreshTokenResponseDto,
} from "@/types/auth.type";

/* -------- Signup -------- */

export const useSignupMutation = () =>
  useMutation<SignUpResponseDto, Error, SignUpDtoRequestDto>({
    mutationKey: ["signup"],
    mutationFn: signup,
  });

export const useSignupEmailVerifyMutation = () =>
  useMutation<OTPResponseDto, Error, OTPRequestDto>({
    mutationKey: ["signupEmailVerify"],
    mutationFn: signupEmailVerify,
  });

/* -------- Signin -------- */

export const useSigninMutation = () =>
  useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationKey: ["signin"],
    mutationFn: signin,
  });

/* -------- Forget Password -------- */

export const useForgetPasswordMutation = () =>
  useMutation<ForgetPasswordResponseDto, Error, ForgetPasswordRequestDto>({
    mutationKey: ["forgetPassword"],
    mutationFn: forgetPassword,
  });

export const useForgetEmailVerifyMutation = () =>
  useMutation<OTPResponseDto, Error, OTPRequestDto>({
    mutationKey: ["forgetEmailVerify"],
    mutationFn: forgetEmailVerify,
  });

/* -------- Reset Password -------- */

export const useResetPasswordMutation = () =>
  useMutation<ResetPasswordResponseDto, Error, ResetPasswordRequestDto>({
    mutationKey: ["resetPassword"],
    mutationFn: resetPassword,
  });

/* -------- Refresh Token -------- */

export const useRefreshTokenMutation = () =>
  useMutation<RefreshTokenResponseDto, Error, RefreshTokenRequestDto>({
    mutationKey: ["refreshToken"],
    mutationFn: refreshToken,
  });
