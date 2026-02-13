import axios from "@/lib/axios";
import {
  CreateAuctionDto,
  ExtendAuctionDto,
  PlaceBidDto,
  AuctionResponseDto,
  AuctionDetailsResponseDto,
  AuctionBidDto,
  PaginatedResponseDto,
  PaginationQueryDto,
  GetAuctionsQueryDto,
} from "@/types/auction.type";

/* ============================================================
   CREATE AUCTION (ADMIN)
============================================================ */

export const createAuction = async (
  payload: CreateAuctionDto,
): Promise<AuctionResponseDto> => {
  const { data } = await axios.post<AuctionResponseDto>(
    "/auction/create",
    payload,
  );
  return data;
};

/* ============================================================
   PLACE BID
============================================================ */

export const placeBid = async (
  payload: PlaceBidDto,
): Promise<{ message: string }> => {
  const { data } = await axios.post<{ message: string }>(
    "/auction/bid",
    payload,
  );
  return data;
};

/* ============================================================
   GET SINGLE AUCTION
============================================================ */

export const getAuction = async (
  id: string,
): Promise<AuctionDetailsResponseDto> => {
  const { data } = await axios.get<AuctionDetailsResponseDto>(
    `/auction/${id}`,
  );
  return data;
};

/* ============================================================
   EXTEND AUCTION (ADMIN)
============================================================ */

export const extendAuction = async (
  id: string,
  payload: ExtendAuctionDto,
): Promise<AuctionResponseDto> => {
  const { data } = await axios.patch<AuctionResponseDto>(
    `/auction/${id}/extend`,
    payload,
  );
  return data;
};

/* ============================================================
   GET AUCTION BIDS (PAGINATED)
============================================================ */

export const getAuctionBids = async (
  auctionId: string,
  params: PaginationQueryDto,
): Promise<PaginatedResponseDto<AuctionBidDto>> => {
  const { data } = await axios.get<
    PaginatedResponseDto<AuctionBidDto>
  >(`/auction/${auctionId}/bids`, { params });

  return data;
};

/* ============================================================
   GET ALL AUCTIONS (ADMIN)
============================================================ */

export const getAllAuctions = async (
  params: GetAuctionsQueryDto,
): Promise<PaginatedResponseDto<AuctionResponseDto>> => {
  const { data } = await axios.get<
    PaginatedResponseDto<AuctionResponseDto>
  >("/auction", { params });

  return data;
};
