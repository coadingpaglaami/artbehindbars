/* ============================================================
   ENUMS
============================================================ */

export type AuctionStatus =
  | "Upcoming"
  | "Ongoing"
  | "Ended"

/* ============================================================
   PAGINATION
============================================================ */

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

export interface PaginationQueryDto {
  page?: number;
  limit?: number;
}

/* ============================================================
   CREATE / EXTEND
============================================================ */

export interface CreateAuctionDto {
  artworkId: string;
  startAt: string; // ISO string
  endAt: string;   // ISO string
}

export interface ExtendAuctionDto {
  newEndAt: string; // ISO string
}

/* ============================================================
   BIDS
============================================================ */

export interface PlaceBidDto {
  auctionId: string;
  bidPrice: number;
}

export interface AuctionBidDto {
  userId: string;
  firstName?: string;
  lastName?: string;
  bidPrice: number;
  createdAt: string;
}

/* ============================================================
   AUCTION LIST RESPONSE
============================================================ */

export interface AuctionResponseDto {
  id: string;
  artworkId: string;
  artworkTitle: string;

  startPrice: number;
  currentPrice: number;

  startAt: string;
  endAt: string;

  status: AuctionStatus;
}

/* ============================================================
   AUCTION DETAILS
============================================================ */

export interface AuctionDetailsResponseDto {
  id: string;
  artworkId: string;
  artworkTitle: string;

  startPrice: number;
  currentPrice: number;

  startAt: string;
  endAt: string;
  secondsRemaining: number;

  status: AuctionStatus;

  highestBidderId?: string;
  highestBidderName?: string;

  userBidStatus?: "WINNING" | "OUTBID" | "LOST" | "NOT_PARTICIPATED";
}

/* ============================================================
   ADMIN QUERY
============================================================ */

export interface GetAuctionsQueryDto extends PaginationQueryDto {
  status?: AuctionStatus;
}
