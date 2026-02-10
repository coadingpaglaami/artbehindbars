import axios from "@/lib/axios";
import {
  ArtistRequestDto,
  ArtistResponseDto,
  ArtWorkUploadRequestDto,
  ArtWorkUploadResponseDto,
  ArtworkResponseDto,
  GetArtworksQueryDto,
  PaginationQueryDto,
  PaginatedResponseDto,
  CreateFanMailDto,
  ReplyFanMailDto,
  FanMailQueryDto,
} from "@/types/gallery.types";

/* ---------------- Artist ---------------- */

export const createArtist = async (
  payload: ArtistRequestDto,
  artistImage: File,
): Promise<ArtistResponseDto> => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) =>
    formData.append(key, String(value)),
  );

  formData.append("artistImage", artistImage);

  console.log(payload);

  const { data } = await axios.post<ArtistResponseDto>("/artist", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const getAllArtists = async (
  params: PaginationQueryDto,
): Promise<PaginatedResponseDto<ArtistResponseDto>> => {
  const { data } = await axios.get("/artist", { params });

  return data;
};

export const updateArtist = async (
  id: string,
  artist: Partial<ArtistRequestDto>,
  artistImage?: File,
): Promise<ArtistResponseDto> => {
  const formData = new FormData();
  if (artistImage) {
    formData.append("artistImage", artistImage);
  }
  Object.keys(artist).forEach((key) => {
    formData.append(key, String(artist[key as keyof ArtistRequestDto]));
  });

  const { data } = await axios.patch<ArtistResponseDto>(
    `/artist/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return data;
};

/* -------- Delete Artist -------- */
export const deleteArtist = async (
  id: string,
): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`/artist/${id}`);
  return data;
};

/* ---------------- Artwork ---------------- */

export const uploadArtwork = async (
  payload: ArtWorkUploadRequestDto,
  artworkImage: File,
): Promise<ArtWorkUploadResponseDto> => {
  const formData = new FormData();

  console.log(typeof payload.isAnonymous);
  console.log(payload.isAnonymous);
  Object.entries(payload).forEach(([key, value]) =>
    formData.append(key, String(value)),
  );

  formData.append("artworkImage", artworkImage);

  const { data } = await axios.post<ArtWorkUploadResponseDto>(
    "/artworkupload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

export const updateArtwork = async (
  id: string,
  artwork: Partial<ArtWorkUploadRequestDto>,
  artworkImage?: File,
): Promise<ArtworkResponseDto> => {
  const formData = new FormData();
  if (artworkImage) {
    formData.append("artworkImage", artworkImage);
  }
  Object.keys(artwork).forEach((key) => {
    formData.append(key, String(artwork[key as keyof ArtWorkUploadRequestDto]));
  });

  console.log(artwork.isAnonymous);

  const { data } = await axios.patch<ArtworkResponseDto>(
    `/artwork/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );

  return data;
};

/* -------- Delete Artwork -------- */
export const deleteArtwork = async (
  id: string,
): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`/artwork/${id}`);
  return data;
};

export const getAllArtworks = async (
  params: GetArtworksQueryDto,
): Promise<PaginatedResponseDto<ArtworkResponseDto>> => {
  const { data } = await axios.get("/artworks", { params });

  return data;
};

/* ---------------- Fan Mail (User) ---------------- */

export const sendFanMail = async (
  artistId: string,
  payload: CreateFanMailDto,
) => {
  const { data } = await axios.post(`/${artistId}/send`, payload);
  return data;
};

export const getMyFanMails = async (params: PaginationQueryDto) => {
  const { data } = await axios.get("/fan_mail/my", { params });
  return data;
};

/* ---------------- Fan Mail (Admin) ---------------- */

const ADMIN_FANMAIL = "/admin/fanmail";

export const adminGetFanMails = async (params: FanMailQueryDto) => {
  const { data } = await axios.get(ADMIN_FANMAIL, { params });
  return data;
};

export const adminGetFanMail = async (id: string) => {
  const { data } = await axios.get(`${ADMIN_FANMAIL}/${id}`);
  return data;
};

export const adminReplyFanMail = async (
  id: string,
  payload: ReplyFanMailDto,
) => {
  const { data } = await axios.post(`${ADMIN_FANMAIL}/${id}/reply`, payload);
  return data;
};

export const archiveFanMail = async (id: string) => {
  const { data } = await axios.patch(`${ADMIN_FANMAIL}/${id}/archive`);
  return data;
};
