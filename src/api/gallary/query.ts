import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createArtist,
  getAllArtists,
  uploadArtwork,
  getAllArtworks,
  sendFanMail,
  getMyFanMails,
  adminGetFanMails,
  adminGetFanMail,
  adminReplyFanMail,
  archiveFanMail,
} from "./api";

import {
  ArtistRequestDto,
  ArtWorkUploadRequestDto,
  PaginationQueryDto,
  GetArtworksQueryDto,
  CreateFanMailDto,
  ReplyFanMailDto,
  FanMailQueryDto,
} from "@/types/gallery.types";

/* ---------- Artists ---------- */

export const useGetArtists = (params: PaginationQueryDto) =>
  useQuery({
    queryKey: ["artists", params],
    queryFn: () => getAllArtists(params),
  });

export const useCreateArtist = () =>
  useMutation({
    mutationKey: ["createArtist"],
    mutationFn: ({
      payload,
      image,
    }: {
      payload: ArtistRequestDto;
      image: File;
    }) => createArtist(payload, image),
  });

/* ---------- Artworks ---------- */

export const useUploadArtwork = () =>
  useMutation({
    mutationKey: ["uploadArtwork"],
    mutationFn: ({
      payload,
      image,
    }: {
      payload: ArtWorkUploadRequestDto;
      image: File;
    }) => uploadArtwork(payload, image),
  });

export const useGetArtworks = (params: GetArtworksQueryDto) =>
  useQuery({
    queryKey: ["artworks", params],
    queryFn: () => getAllArtworks(params),
  });

/* ---------- Fan Mail (User) ---------- */

export const useSendFanMail = () =>
  useMutation({
    mutationKey: ["sendFanMail"],
    mutationFn: ({
      artistId,
      payload,
    }: {
      artistId: string;
      payload: CreateFanMailDto;
    }) => sendFanMail(artistId, payload),
  });

export const useMyFanMails = (params: PaginationQueryDto) =>
  useQuery({
    queryKey: ["myFanMails", params],
    queryFn: () => getMyFanMails(params),
  });

/* ---------- Fan Mail (Admin) ---------- */

export const useAdminFanMails = (params: FanMailQueryDto) =>
  useQuery({
    queryKey: ["adminFanMails", params],
    queryFn: () => adminGetFanMails(params),
  });

export const useAdminFanMail = (id: string) =>
  useQuery({
    queryKey: ["adminFanMail", id],
    queryFn: () => adminGetFanMail(id),
    enabled: !!id,
  });

export const useReplyFanMail = () =>
  useMutation({
    mutationKey: ["replyFanMail"],
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ReplyFanMailDto;
    }) => adminReplyFanMail(id, payload),
  });

export const useArchiveFanMail = () =>
  useMutation({
    mutationKey: ["archiveFanMail"],
    mutationFn: (id: string) => archiveFanMail(id),
  });
