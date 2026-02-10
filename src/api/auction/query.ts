import { PaginationQueryDto } from "@/types/gallery.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAuctionBids, placeBid } from "./api";
import { PlaceBidDto } from "@/types/auction.type";

export const useGetAuctionBids = (
  auctionId: string,
  params: PaginationQueryDto,
) => {
  return useQuery({
    queryKey: ["auctionBids", auctionId, params],
    queryFn: () => getAuctionBids(auctionId, params),
    enabled: !!auctionId,
    refetchInterval: 10000, // Refetch every 10 seconds for real-time updates
  });
};

export const usePlaceBidMutation = () => {
  return useMutation({
    mutationKey: ["placeBid"],
    mutationFn: (data: PlaceBidDto) => placeBid(data),
  });
};
