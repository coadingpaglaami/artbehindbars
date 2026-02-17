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
  connectionsCount: number; // Optional list of connections for the user
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
export interface ContactUsDto {
  name: string;
  email: string;
  subject?: string;
  message: string;
}