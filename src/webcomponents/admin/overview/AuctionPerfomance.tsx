// AuctionPerformance.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuctionPerformanceData, AuctionTimeframe } from "@/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface AuctionPerformanceProps {
  data?: AuctionPerformanceData;
  isLoading?: boolean;
  onTimeframeChange?: (timeframe: AuctionTimeframe) => void;
  activeTimeframe?: AuctionTimeframe;
}

export const AuctionPerformance = ({
  data,
  isLoading = false,
  onTimeframeChange,
  activeTimeframe = "Ended",
}: AuctionPerformanceProps) => {
  const [selectedTimeframe, setSelectedTimeframe] =
    useState<AuctionTimeframe>(activeTimeframe);

  const handleTimeframeClick = (timeframe: AuctionTimeframe) => {
    setSelectedTimeframe(timeframe);
    onTimeframeChange?.(timeframe);
  };

  // Get counts based on timeframe

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Auction Performance</CardTitle>
            <CardDescription>Recent auction results</CardDescription>
          </div>
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            🏆
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (
    !data ||
    (data.ongoing === 0 && data.upcoming === 0 && data.ended === 0)
  ) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Auction Performance</CardTitle>
            <CardDescription>Recent auction results</CardDescription>
          </div>
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            🏆
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-gray-500 mt-1">Ongoing</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-gray-500 mt-1">Upcoming</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-gray-500 mt-1">Ended</div>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <Button
              size="sm"
              variant={selectedTimeframe === "Ongoing" ? "default" : "outline"}
              className={
                selectedTimeframe === "Ongoing"
                  ? "bg-green-500 hover:bg-green-600"
                  : ""
              }
              onClick={() => handleTimeframeClick("Ongoing")}
            >
              Ongoing
            </Button>
            <Button
              size="sm"
              variant={selectedTimeframe === "Upcoming" ? "default" : "outline"}
              className={
                selectedTimeframe === "Upcoming"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : ""
              }
              onClick={() => handleTimeframeClick("Upcoming")}
            >
              Upcoming
            </Button>
            <Button
              size="sm"
              variant={selectedTimeframe === "Ended" ? "default" : "outline"}
              className={
                selectedTimeframe === "Ended"
                  ? "bg-purple-500 hover:bg-purple-600"
                  : ""
              }
              onClick={() => handleTimeframeClick("Ended")}
            >
              Ended
            </Button>
          </div>

          <div className="flex justify-center items-center h-[200px] text-gray-500">
            No auction data available for {selectedTimeframe.toLowerCase()}{" "}
            timeframe
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate total and average bid values from lastHighBids
  const totalBidValue = data.selected.lastHighBids.reduce(
    (sum, bid) => sum + bid.price,
    0,
  );
  const avgBidValue = totalBidValue / data.selected.lastHighBids.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Auction Performance</CardTitle>
          <CardDescription>Recent auction results</CardDescription>
        </div>
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          🏆
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold">{data.ongoing}</div>
            <div className="text-xs text-gray-500 mt-1">Ongoing</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold">{data.upcoming}</div>
            <div className="text-xs text-gray-500 mt-1">Upcoming</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold">{data.ended}</div>
            <div className="text-xs text-gray-500 mt-1">Ended</div>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <Button
            size="sm"
            variant={selectedTimeframe === "Ongoing" ? "default" : "outline"}
            className={
              selectedTimeframe === "Ongoing"
                ? "bg-green-500 hover:bg-green-600"
                : ""
            }
            onClick={() => handleTimeframeClick("Ongoing")}
          >
            Ongoing
          </Button>
          <Button
            size="sm"
            variant={selectedTimeframe === "Upcoming" ? "default" : "outline"}
            className={
              selectedTimeframe === "Upcoming"
                ? "bg-blue-500 hover:bg-blue-600"
                : ""
            }
            onClick={() => handleTimeframeClick("Upcoming")}
          >
            Upcoming
          </Button>
          <Button
            size="sm"
            variant={selectedTimeframe === "Ended" ? "default" : "outline"}
            className={
              selectedTimeframe === "Ended"
                ? "bg-purple-500 hover:bg-purple-600"
                : ""
            }
            onClick={() => handleTimeframeClick("Ended")}
          >
            Ended
          </Button>
        </div>
        <>
          {data.selected.total > 0 ? (
            <>
              <div className="space-y-3">
                {data.selected.lastHighBids.map((bid, index) => {
                  const userName = bid.bidderName ? bid.bidderName : `User `;
                  return (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium truncate max-w-[150px]">
                          {bid.artworkTitle}
                        </span>
                        <Badge
                          variant="default"
                          className="text-xs bg-purple-500"
                        >
                          #{index + 1} High Bid
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 truncate max-w-[120px]">
                          {userName || "Anonymous"}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          ${bid.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
                <div>
                  <div className="text-xs text-gray-500">Total Bid Value</div>
                  <div className="text-lg font-bold">
                    ${totalBidValue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Avg Bid Value</div>
                  <div className="text-lg font-bold">
                    ${Math.round(avgBidValue).toLocaleString()}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[200px] text-gray-500">
              No bid data available for {selectedTimeframe.toLowerCase()}{" "}
              auctions
            </div>
          )}
        </>
      </CardContent>
    </Card>
  );
};
