/* ================= PROFILE ================= */

export interface AccountProfile {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string | null;
  connectionCount: number;
}

/* ================= DTOs ================= */

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  dateOfBirth?: string;
  avatar?: string | null;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface RequestEmailChangeDto {
  newEmail: string;
}

export interface VerifyEmailChangeDto {
  otp: string;
}

/* ================= RESPONSES ================= */

export interface GenericMessageResponse {
  message: string;
}
