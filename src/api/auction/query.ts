import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";
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
  UserAuctionHistoryItemDto,
  OrderResponseDto,
} from "@/types/auction.type";
import { getOrderByAuctionId } from "./api";

/* ============================================================
   QUERY KEYS
============================================================ */

export const auctionKeys = {
  all: ["auction"] as const,
  lists: (params?: unknown) => ["auction", "list", params] as const,
  detail: (id: string) => ["auction", "detail", id] as const,
  bids: (id: string, params?: unknown) =>
    ["auction", "bids", id, params] as const,
  myHistory: (params?: unknown) => ["auction", "my-history", params] as const,
};

/* ============================================================
   ADMIN: CREATE
============================================================ */

export const useCreateAuction = () =>
  useMutation<AuctionResponseDto, Error, CreateAuctionDto>({
    mutationKey: ["auction", "create"],
    mutationFn: api.createAuction,
  });

/* ============================================================
   USER: PLACE BID
============================================================ */

export const usePlaceBidMutation = () =>
  useMutation<{ message: string }, Error, PlaceBidDto>({
    mutationKey: ["auction", "placeBid"],
    mutationFn: api.placeBid,
  });

/* ============================================================
   GET SINGLE AUCTION (Live Refresh)
============================================================ */

export const useGetAuction = (id: string) =>
  useQuery<AuctionDetailsResponseDto>({
    queryKey: auctionKeys.detail(id),
    queryFn: () => api.getAuction(id),
    enabled: !!id,
    refetchInterval: 5000, // live countdown & bid updates
  });

/* ============================================================
   GET AUCTION BIDS
============================================================ */

export const useGetAuctionBids = (
  auctionId: string,
  params: PaginationQueryDto,
) =>
  useQuery<PaginatedResponseDto<AuctionBidDto>>({
    queryKey: auctionKeys.bids(auctionId, params),
    queryFn: () => api.getAuctionBids(auctionId, params),
    enabled: !!auctionId,
    refetchInterval: 10000, // 10 sec polling
  });

/* ============================================================
   ADMIN: EXTEND
============================================================ */

export const useExtendAuction = () =>
  useMutation<
    AuctionResponseDto,
    Error,
    { id: string; payload: ExtendAuctionDto }
  >({
    mutationKey: ["auction", "extend"],
    mutationFn: ({ id, payload }) => api.extendAuction(id, payload),
  });

/* ============================================================
   ADMIN: GET ALL
============================================================ */

export const useGetAllAuctions = (params: GetAuctionsQueryDto) =>
  useQuery<PaginatedResponseDto<AuctionResponseDto>>({
    queryKey: auctionKeys.lists(params),
    queryFn: () => api.getAllAuctions(params),
  });

export const useMyAuctionHistory = (params: PaginationQueryDto) =>
  useQuery<PaginatedResponseDto<UserAuctionHistoryItemDto>>({
    queryKey: auctionKeys.myHistory(params),
    queryFn: () => api.getMyAuctionHistory(params),
    staleTime: 1000 * 30, // 30 sec
  });

  export const useGetOrderByAuctionIdQuery = (orderId: string) =>
  useQuery<OrderResponseDto, Error>({
    queryKey: ["orderByAuctionId", orderId],
    queryFn: () => getOrderByAuctionId(orderId),
  });