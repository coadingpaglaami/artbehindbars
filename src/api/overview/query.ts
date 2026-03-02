import { useQuery } from "@tanstack/react-query";
import {
  getArtworkCategoryStats,
  getAuctionPerformance,
  getOverViewData,
  getRevenueTrends,
  getTopArtists,
  getUserEngagement,
} from "./api";

export const useGetOverviewData = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: getOverViewData,
  });
};

export const useGetRevenueTrends = () => {
  return useQuery({
    queryKey: ["revenue-trends"],
    queryFn: getRevenueTrends,
  });
};

export const useGetTopArtists = () => {
  return useQuery({
    queryKey: ["top-artists"],
    queryFn: getTopArtists,
  });
};

export const useGetArtworkCategoryStats = () => {
  return useQuery({
    queryKey: ["artwork-category-stats"],
    queryFn: getArtworkCategoryStats,
  });
};

export const useGetAuctionPerformance = (timeframe: string) => {
  return useQuery({
    queryKey: ["auction-performance", timeframe],
    queryFn: () => getAuctionPerformance(timeframe),
    enabled: !!timeframe,
  });
};

export const useGetUserEngagement = () => {
  return useQuery({
    queryKey: ["member-engagement"],
    queryFn: getUserEngagement,
  });
};
