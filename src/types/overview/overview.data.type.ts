// types/admin.types.ts
export interface MetricChange {
  percentage: number;
  trend: "UP" | "DOWN" | "SAME";
}

export interface UsersMetric {
  total: number;
  change: MetricChange;
}

export interface ArtworksMetric {
  total: number;
  change: MetricChange;
}

export interface ActiveAuctionsMetric {
  total: number;
  change: MetricChange;
}

export interface RevenueMetric {
  total: number;
  change: MetricChange;
}

export interface OverviewData {
  users: UsersMetric;
  artworks: ArtworksMetric;
  activeAuctions: ActiveAuctionsMetric;
  revenue: RevenueMetric;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface RevenueTrendsData {
  totalRevenue: number;
  avgSales: number;
  totalSales: MonthlyRevenue[];
}

// types/admin.types.ts (add this interface)
export interface ArtworkCategoryData {
  religiousPercentage: string;
  nonReligiousPercentage: string;
}

// types/admin.types.ts (add this interface)
export interface TopArtistData {
  artistName: string;
  totalArtwork: number;
}

// types/admin.types.ts (add these interfaces)
export interface LastHighBid {
  bidderName: string;
  price: number;
  artworkTitle: string;
}

export interface TimeframePerformance {
  total: number;
  lastHighBids: LastHighBid[];
}

export interface AuctionPerformanceData {
  ongoing: number;
  upcoming: number;
  ended: number;
  selected: TimeframePerformance;
}

export type AuctionTimeframe = "Upcoming" | "Ongoing" | "Ended";

// types/admin.types.ts (add this interface)
export interface UserEngagementData {
  active: number;
  newUsers: number;
  inactive: number;
  averageScore: number | null;
  engagementTrend: {
    day: string;
    total: number;
  }[];
}