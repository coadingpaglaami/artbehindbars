import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";

import {
  UpdateProfileDto,
  ChangePasswordDto,
  RequestEmailChangeDto,
  VerifyEmailChangeDto,
} from "@/types/account.type";
import { PaginationQueryDto } from "@/types/auction.type";

/* ---------- PROFILE ---------- */

export const useGetMyProfile = () =>
  useQuery({
    queryKey: ["getMyProfile"],
    queryFn: api.getMyProfile,
  });

/* ================= MUTATIONS ================= */

export const useUpdateProfileMutation = () =>
  useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: ({
      payload,
      image,
    }: {
      payload: UpdateProfileDto;
      image?: File | null | undefined;
    }) => api.updateProfile(payload, image),
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (payload: ChangePasswordDto) => api.changePassword(payload),
  });

export const useRequestEmailChangeMutation = () =>
  useMutation({
    mutationKey: ["requestEmailChange"],
    mutationFn: (payload: RequestEmailChangeDto) =>
      api.requestEmailChange(payload),
  });

export const useVerifyOldEmailMutation = () =>
  useMutation({
    mutationKey: ["verifyOldEmail"],
    mutationFn: (payload: VerifyEmailChangeDto) => api.verifyOldEmail(payload),
  });

export const useVerifyNewEmailMutation = () =>
  useMutation({
    mutationKey: ["verifyNewEmail"],
    mutationFn: (payload: VerifyEmailChangeDto) => api.verifyNewEmail(payload),
  });

export const useBlockUnblockUserMutation = () =>
  useMutation({
    mutationKey: ["blockUnblockUser"],
    mutationFn: api.blockUnblockUser,
  });

export const useGetOtherUserProfile = (userId: string) =>
  useQuery({
    queryKey: ["getOtherUserProfile", userId],
    queryFn: () => api.getOtherUserProfile(userId),
  });

export const useGetMyBlockedUsers = (query: PaginationQueryDto) =>
  useQuery({
    queryKey: ["getMyBlockedUsers", query],
    queryFn: () => api.getMyBlockedUsers(query),
  });

export const useGetMyBoughtArtworks = () =>
  useQuery({
    queryKey: ["getMyBoughtArtworks"],
    queryFn: api.getMyBoughtArtworks,
  });

export const useGetMyBillingHistory = () =>
  useQuery({
    queryKey: ["getMyBillingHistory"],
    queryFn: api.getMyBillingHistory,
  });

export const useContactUsMutation = () =>
  useMutation({
    mutationKey: ["contactUs"],
    mutationFn: api.contactUs,
  });

export const useGoogleLogin = () =>
  useMutation({
    mutationKey: ["googleLogin"],
    mutationFn: api.googleLogin,
  });
