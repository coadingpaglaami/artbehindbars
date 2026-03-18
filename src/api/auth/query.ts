import { useMutation, useQuery } from "@tanstack/react-query";
import {
  signup,
  signupEmailVerify,
  signin,
  forgetPassword,
  forgetEmailVerify,
  resetPassword,
  refreshToken,
  getMe,
  logout,
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
import { use } from "react";
import { log } from "console";

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

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useAuth = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000, // cache 5 min
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    role: user?.role ?? null,
    isAdmin: user?.role === "ADMIN",
  };
};

export const useLogout = () => {
  useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
