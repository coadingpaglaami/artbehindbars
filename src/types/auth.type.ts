// Enums (mirror Prisma)
export type Role = "ADMIN" | "USER";
export type OtpType = "signup" | "resetPassword";

/* ---------------- Request DTOs ---------------- */

export interface SignUpDtoRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO string from frontend
  role: Role;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface ForgetPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface OTPRequestDto {
  email: string;
  otp: string;
  otpType: OtpType;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

/* ---------------- User ---------------- */

export interface UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  dateOfBirth: string;
  createdAt: string;
  updatedAt: string;
}

/* ---------------- Response DTOs ---------------- */

export interface SignUpResponseDto {
  user: UserResponseDto;
  message: string;
}

export interface LoginResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface ForgetPasswordResponseDto {
  message: string;
}

export interface OTPResponseDto {
  email: string;
  otpType: OtpType;
  verified: boolean;
}

export interface ResetPasswordResponseDto {
  message: string;
}
