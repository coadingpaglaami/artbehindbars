// Overview.tsx
"use client";
import { Button } from "@/components/ui/button";
import { activityData, artistsData, auctionData } from "@/data/admin/dashboard";
import { AdminHeading } from "@/webcomponents/reusable";
import { Download, Users, Image, Hammer, DollarSign } from "lucide-react";
import { RecentActivity } from "./RecentActivity";
import { MemberEngagement } from "./MemberEngagement";
import { AuctionPerformance } from "./AuctionPerfomance";
import { TopArtists } from "./TopArtist";
import { ArtworkCategory } from "./ArtWorkCategory";
import { RevenueTrends } from "./RevenueTrend";
import { StatCard } from "./StatsCard";
import {
  useGetArtworkCategoryStats,
  useGetAuctionPerformance,
  useGetOverviewData,
  useGetRevenueTrends,
  useGetTopArtists,
  useGetUserEngagement,
} from "@/api/overview";
import { OverviewData } from "@/types";
import { useState } from "react";

// Map API data to stat card props
const getStatCards = (data: OverviewData) => [
  {
    id: "users",
    icon: Users,
    iconColor: "bg-blue-500",
    title: "Total Users",
    value: data.users.total.toLocaleString(),
    trend:
      data.users.change.trend === "UP"
        ? "up"
        : data.users.change.trend === "DOWN"
          ? "down"
          : "up",
    trendValue: `${data.users.change.percentage > 0 ? "+" : ""}${data.users.change.percentage}%`,
  },
  {
    id: "artworks",
    icon: Image,
    iconColor: "bg-purple-500",
    title: "Total Artworks",
    value: data.artworks.total.toLocaleString(),
    trend:
      data.artworks.change.trend === "UP"
        ? "up"
        : data.artworks.change.trend === "DOWN"
          ? "down"
          : "up",
    trendValue: `${data.artworks.change.percentage > 0 ? "+" : ""}${data.artworks.change.percentage}%`,
  },
  {
    id: "activeAuctions",
    icon: Hammer,
    iconColor: "bg-amber-500",
    title: "Active Auctions",
    value: data.activeAuctions.total.toLocaleString(),
    trend:
      data.activeAuctions.change.trend === "UP"
        ? "up"
        : data.activeAuctions.change.trend === "DOWN"
          ? "down"
          : "up",
    trendValue:
      data.activeAuctions.change.percentage === 0
        ? "0%"
        : `${data.activeAuctions.change.percentage > 0 ? "+" : ""}${data.activeAuctions.change.percentage}%`,
  },
  {
    id: "revenue",
    icon: DollarSign,
    iconColor: "bg-green-500",
    title: "Total Revenue",
    value: `$${(data.revenue.total / 100).toLocaleString()}`,
    trend:
      data.revenue.change.trend === "UP"
        ? "up"
        : data.revenue.change.trend === "DOWN"
          ? "down"
          : "up",
    trendValue: `${data.revenue.change.percentage > 0 ? "+" : ""}${data.revenue.change.percentage}%`,
  },
];

export const Overview = () => {
  const [duration, setDuration] = useState<"Upcoming" | "Ongoing" | "Ended">(
    "Ongoing",
  );
  const { data, isLoading } = useGetOverviewData();
  const { data: revenueDataApi, isLoading: isRevenueLoading } =
    useGetRevenueTrends();
  const { data: artworkCategoryData, isLoading: isArtworkCategoryLoading } =
    useGetArtworkCategoryStats();
  const { data: topArtistsData, isLoading: isTopArtistsLoading } =
    useGetTopArtists();
  const {
    data: auctionPerformanceData,
    isLoading: isAuctionPerformanceLoading,
  } = useGetAuctionPerformance(duration);
  const { data: engagementData, isLoading: isEngagementLoading } =
    useGetUserEngagement();

  // Format current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (isLoading) {
    return (
      <div className="py-16 flex flex-col gap-6">
        <AdminHeading
          heading="Overview"
          subheading="Comprehensive analytics for your prison art marketplace"
        />
        <div className="flex justify-center items-center min-h-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-16 flex flex-col gap-6">
        <AdminHeading
          heading="Overview"
          subheading="Comprehensive analytics for your prison art marketplace"
        />
        <div className="p-8 text-center text-gray-500">No data available</div>
      </div>
    );
  }

  const statCards = getStatCards(data.data);

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Overview"
        subheading="Comprehensive analytics for your prison art marketplace"
      />

      <div className="flex items-center justify-end gap-3">
        <span className="text-sm text-gray-500">📅 {formattedDate}</span>
        {/* <Button>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button> */}
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        {statCards.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <RevenueTrends data={revenueDataApi} isLoading={isRevenueLoading} />
        <ArtworkCategory
          data={artworkCategoryData}
          isLoading={isArtworkCategoryLoading}
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <TopArtists data={topArtistsData} isLoading={isTopArtistsLoading} />
        <AuctionPerformance
          data={auctionPerformanceData}
          isLoading={isAuctionPerformanceLoading}
          onTimeframeChange={setDuration}
          activeTimeframe={duration}
        />
        <MemberEngagement
          data={engagementData}
          isLoading={isEngagementLoading}
        />
      </div>

      <RecentActivity activities={activityData} />
    </div>
  );
};
