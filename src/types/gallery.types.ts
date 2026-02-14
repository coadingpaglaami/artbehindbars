/* ---------------- Enums ---------------- */

import { AuctionDetailsResponseDto, AuctionResponseDto } from "./auction.type";

export type Category = "Religious" | "Non_Religious";

export type FanMailStatus = "PENDING" | "REPLIED";

/* ---------------- Pagination ---------------- */

export interface PaginationQueryDto {
  page?: number;
  limit?: number;
}

export interface GetArtistsQueryDto extends PaginationQueryDto {
  searchTerm?: string;
}

export interface PaginationMetaDto {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponseDto<T> {
  data: T[];
  meta: PaginationMetaDto;
}

/* ---------------- Artist ---------------- */

export interface ArtistRequestDto {
  name: string;
  facilityName: string;
  lifeSentence: string;
  inmateId: string;
  maxReleaseDate: string; // ISO date
  minReleaseDate: string; // ISO date
  state: string;
}

export interface ArtistResponseDto extends ArtistRequestDto {
  id: string;
  createdAt: string;
  image: string;
  
}

/* ---------------- Artwork ---------------- */

export interface ArtWorkUploadRequestDto {
  artistId: string;
  title: string;
  isAnonymous?: boolean;
  category: Category;
  buyItNowPrice: number | string;
}

export interface ArtWorkUploadResponseDto extends ArtWorkUploadRequestDto {
  id: string;
  createdAt: string;
  imageUrl: string;
  isSold: boolean;
  auction:AuctionResponseDto;
}

export interface ArtworkArtistDto {
  name: string;
}

export interface ArtworkResponseDto {
  id: string;
  title: string;
  isAnonymous: boolean;
  category: Category;
  buyItNowPrice: number;
  startingBidPrice: number;
  createdAt: string;
  imageUrl: string;
  artist: ArtworkArtistDto | null;
  isSold: boolean;
  auction: AuctionDetailsResponseDto | null;
}

/* ---------------- Artwork Query ---------------- */

export interface GetArtworksQueryDto extends PaginationQueryDto {
  category?: Category;
}

/* ---------------- FanMail ---------------- */

export interface CreateFanMailDto {
  subject?: string;
  message: string;
}

export interface ReplyFanMailDto {
  message: string;
}

export interface FanMailQueryDto extends PaginationQueryDto {
  status?: FanMailStatus;
  isArchived?: boolean;
}
