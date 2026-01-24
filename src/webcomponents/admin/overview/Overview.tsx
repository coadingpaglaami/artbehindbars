import { Button } from "@/components/ui/button";
import { activityData, artistsData, auctionData, categoryData, revenueData, statsData } from "@/data/admin/dashboard";
import { AdminHeading } from "@/webcomponents/reusable";
import { Download } from "lucide-react";
import { RecentActivity } from "./RecentActivity";
import { MemberEngagement } from "./MemberEngagement";
import { AuctionPerformance } from "./AuctionPerfomance";
import { TopArtists } from "./TopArtist";
import { ArtworkCategory } from "./ArtWorkCategory";
import { RevenueTrends } from "./RevenueTrend";
import { StatCard } from "./StatsCard";

export const Overview = () => {
  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Overview"
        subheading="Comprehensive analytics for your prison art marketplace"
      />
      <div className="flex items-center justify-end gap-3">
            <span className="text-sm text-gray-500">📅 Jan 11, 2025</span>
            <Button className="">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-6 mb-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <RevenueTrends data={revenueData} />
          <ArtworkCategory categories={categoryData} />

        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <TopArtists artists={artistsData} />

          <AuctionPerformance auctions={auctionData} />
          <MemberEngagement  />
        </div>

        <RecentActivity activities={activityData} />
    </div>
  );
};
