import { LucideIcon } from "lucide-react";

// Interface for stats data
export interface StatsData {
  icon: LucideIcon; // Icon component (e.g., Users, Image, Star, DollarSign)
  iconColor: string; // Background color class for the icon
  title: string; // The title of the stat (e.g., Total Artists, Total Artworks)
  value: string; // The value (e.g., '5', '$300')
  trend: "up" | "down"; // Trend direction
  trendValue: string; // The trend percentage (e.g., '+12.5%', '-3.4%')
}

// Interface for revenue data
export interface RevenueData {
  month: string; // The month
  revenue: number; // Revenue for that month
  total: number; // Total possible revenue
  avgSale: number; // Average sale for the month
  totalSales: number; // Total sales count for the month
}

// Interface for category data
export interface CategoryData {
  name: string; // Category name (e.g., Painting, Drawing)
  value: number; // The percentage value of this category
  count: number; // The number of items in this category
}

// Interface for artists data
export interface ArtistData {
  name: string; // Name of the artist
  artworks: number; // Number of artworks by the artist
}

// Interface for auction data
export interface AuctionData {
  title: string; // Artwork title
  status: "High Bid" | "Active" | "Moderate"; // Current auction status
  bid: number; // Current highest bid
}

// Interface for activity data
export interface ActivityData {
  type: "upload" | "member" | "auction" | "registration"; // Type of activity
  title: string; // Title of the activity
  time: string; // Time of the activity
}