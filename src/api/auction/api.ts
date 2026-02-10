import { AuctionBidDto, PlaceBidDto } from "@/types/auction.type";
import {
  PaginatedResponseDto,
  PaginationQueryDto,
} from "@/types/gallery.types";

import axios from "@/lib/axios";

export const getAuctionBids = async (
  auctionId: string,
  params: PaginationQueryDto,
): Promise<PaginatedResponseDto<AuctionBidDto>> => {
  const { data } = await axios.get(`/auctions/${auctionId}/bids`, {
    params,
  });
  return data;
};

export const placeBid = async (dto: PlaceBidDto): Promise<AuctionBidDto> => {
  const { data } = await axios.post("/auctions/bid", dto);
  return data;
};
