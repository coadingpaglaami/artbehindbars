import axios from "@/lib/axios";
import {
  UpdateProfileDto,
  ChangePasswordDto,
  RequestEmailChangeDto,
  VerifyEmailChangeDto,
  AccountProfile,
  GenericMessageResponse,
  ContactUsDto,
} from "@/types/account.type";
import { PaginatedResponseDto, PaginationQueryDto } from "@/types/auction.type";
import { BoughtArtwork } from "@/types/gallery.types";

const ACCOUNT = "/account";

/* -------- PROFILE -------- */

export const getMyProfile = async (): Promise<AccountProfile> => {
  const { data } = await axios.get<AccountProfile>(`${ACCOUNT}/me`);
  return data;
};

export const updateProfile = async (
  payload: UpdateProfileDto,
  artworkImage?: File | null | undefined,
): Promise<AccountProfile> => {
  const form = new FormData();

  Object.entries(payload).forEach(([k, v]) => {
    if (v !== undefined) form.append(k, v);
  });

  if (artworkImage) form.append("artworkImage", artworkImage);

  const { data } = await axios.patch<AccountProfile>(
    `${ACCOUNT}/profile`,
    form,
    {
      timeout: 60000, // 60 seconds timeout for image upload
    },
  );

  return data;
};

/* -------- PASSWORD -------- */

export const changePassword = async (
  payload: ChangePasswordDto,
): Promise<GenericMessageResponse> => {
  const { data } = await axios.patch<GenericMessageResponse>(
    `${ACCOUNT}/password`,
    payload,
  );

  return data;
};

/* -------- EMAIL CHANGE -------- */

export const requestEmailChange = async (
  payload: RequestEmailChangeDto,
): Promise<GenericMessageResponse> => {
  const { data } = await axios.patch<GenericMessageResponse>(
    `${ACCOUNT}/email/request`,
    payload,
  );

  return data;
};

export const verifyOldEmail = async (
  payload: VerifyEmailChangeDto,
): Promise<GenericMessageResponse> => {
  const { data } = await axios.patch<GenericMessageResponse>(
    `${ACCOUNT}/email/verify-old`,
    payload,
  );

  return data;
};

export const verifyNewEmail = async (
  payload: VerifyEmailChangeDto,
): Promise<GenericMessageResponse> => {
  const { data } = await axios.patch<GenericMessageResponse>(
    `${ACCOUNT}/email/verify-new`,
    payload,
  );

  return data;
};

/* -------- BLOCK / UNBLOCK -------- */

export const blockUnblockUser = async (
  userId: string,
): Promise<GenericMessageResponse> => {
  const { data } = await axios.patch<GenericMessageResponse>(
    `${ACCOUNT}/block/${userId}`,
  );

  return data;
};

export const getOtherUserProfile = async (
  userId: string,
): Promise<AccountProfile> => {
  const { data } = await axios.get<AccountProfile>(
    `${ACCOUNT}/${userId}/profile`,
  );

  return data;
};

export const getMyBlockedUsers = async (
  query: PaginationQueryDto,
): Promise<PaginatedResponseDto<AccountProfile>> => {
  const { data } = await axios.get<PaginatedResponseDto<AccountProfile>>(
    `${ACCOUNT}/my-blocked-users`,
    { params: query },
  );
  return data;
};

export const getMyBoughtArtworks = async (): Promise<BoughtArtwork[]> => {
  const { data } = await axios.get<BoughtArtwork[]>(
    `${ACCOUNT}/mybought-artworks`,
  );
  return data;
};

export const getMyBillingHistory = async () => {
  const { data } = await axios.get(`${ACCOUNT}/my-billing-history`);
  return data;
};

export const contactUs = async (payload: ContactUsDto) => {
  const { data } = await axios.post(`/contact-us`, payload);
  return { data };
};
