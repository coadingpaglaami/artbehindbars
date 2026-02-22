import axios from "@/lib/axios";
import { OverviewData } from "@/types";

export const getOverViewData = () => {
  const data = axios.get<OverviewData>("/overview");
  return data;
};

export const getRevenueTrends = async () => {
  const { data } = await axios.get("/overview/revenue-trends");
  return data;
};

export const getTopArtists = async () => {
  const { data } = await axios.get("/overview/top-artists");
  return data;
};

export const getArtworkCategoryStats = async () => {
  const { data } = await axios.get("/overview/artworkby-category");
  return data;
};

export const getAuctionPerformance = async (timeframe: string) => {
  const { data } = await axios.get("/overview/auction-performance", {
    params: { timeframe },
  });
  return data;
};

export const getUserEngagement = async () => {
  const { data } = await axios.get("/member-engagement");
  return data;
}