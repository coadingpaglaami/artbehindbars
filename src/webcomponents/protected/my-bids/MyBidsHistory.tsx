"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  AlertTriangle,
  XCircle,
  Clock,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQueryClient } from "@tanstack/react-query";
import { UserAuctionHistoryItemDto, UserBidStatus } from "@/types/auction.type"; // Adjust path
import { usePlaceBidMutation } from "@/api/auction";

interface MyBidsHistoryProps {
  bid: UserAuctionHistoryItemDto;
  index: number;
}

export const MyBidsHistory = ({ bid, index }: MyBidsHistoryProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(bid.secondsRemaining);

  const {
    mutate: placeBid,
    isPending: isBidPending,
    error: bidError,
  } = usePlaceBidMutation();

  // Live countdown from secondsRemaining
  useEffect(() => {
    if (bid.auctionStatus !== "Ongoing") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSecondsLeft(bid.secondsRemaining);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bid.secondsRemaining, bid.auctionStatus]);

  const formatCountdown = (secs: number): string => {
    if (secs <= 0) return "Ended";
    const d = Math.floor(secs / 86400);
    const h = Math.floor((secs % 86400) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [d > 0 && `${d}d`, h > 0 && `${h}h`, m > 0 && `${m}m`, `${s}s`]
      .filter(Boolean)
      .join(" ");
  };

  // Derive display values from DTO fields
  const isCompleted = bid.auctionStatus === "Ended";

  const getStatusConfig = (status: UserBidStatus) => {
    switch (status) {
      case "WINNING":
        return {
          color: "#00A63E",
          bgColor: "#E8F5E9",
          icon: <TrendingUp size={20} />,
          text: "Winning",
        };
      case "OUTBID":
        return {
          color: "#F97316",
          bgColor: "#FFF7ED",
          icon: <AlertTriangle size={20} />,
          text: "Outbid",
        };

      case "LOST":
        return {
          color: "#DC2626",
          bgColor: "#FEE2E2",
          icon: <XCircle size={20} />,
          text: "Lost",
        };
    }
  };

  const statusConfig = getStatusConfig(bid.userBidStatus as UserBidStatus);

  const formatEndDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  // Bid options: 5%, 8%, 10%, 12% above current highest
  const bidOptions = [5, 8, 10, 12].map((pct) => ({
    percentage: pct,
    amount: Math.ceil(bid.highestBid * (1 + pct / 100)),
  }));

  const handleBidSelection = (amount: number) => {
    placeBid(
      { auctionId: bid.auctionId, bidPrice:amount },
      {
        onSuccess: () => {
          setIsPopoverOpen(false);
          // Invalidate history so status refreshes
          queryClient.invalidateQueries({
            queryKey: ["auctions", "myHistory"],
          });
        },
        onError: (err) => {
          console.error("Bid failed:", err.message);
        },
      },
    );
  };

  const handleViewDetails = () => {
    router.push(`/product/${bid.artworkId}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Side — Image (25%) */}
        <div className="relative w-full md:w-1/4 aspect-square md:aspect-auto min-h-40">
          <Image
            src={bid.imageUrl}
            alt={bid.artworkTitle}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side — Content (75%) */}
        <div className="flex-1 p-4 space-y-3">
          {/* Title and Status */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {bid.artworkTitle}
              </h3>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                Auction #{bid.auctionId.slice(0, 8)}...
              </p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full font-medium whitespace-nowrap shrink-0"
              style={{
                backgroundColor: statusConfig.bgColor,
                color: statusConfig.color,
              }}
            >
              {statusConfig.icon}
              <span>{statusConfig.text}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-300" />

          {/* Bid Information */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1 sm:flex-1">
              <span className="text-sm text-gray-600">My Last Bid</span>
              <span className="text-lg font-semibold text-gray-900">
                ${bid.myLastBid.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-1 sm:flex-1">
              <span className="text-sm text-gray-600">Highest Bid</span>
              <span
                className="text-lg font-semibold"
                style={{
                  color:
                    bid.userBidStatus === "WINNING" ||
                    bid.userBidStatus === "OUTBID"
                      ? "#00A63E"
                      : "#111827",
                }}
              >
                ${bid.highestBid.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Auction End Date for Completed */}
          {isCompleted && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Auction Ended</span>
              <span className="text-gray-900 font-medium">
                {formatEndDate(bid.endAt)}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="border-b border-gray-300" />

          {/* Time Remaining — only for Ongoing */}
          {!isCompleted && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={18} />
                <span className="font-medium">Time Remaining</span>
              </div>
              <span
                className="font-mono font-medium"
                style={{
                  color: secondsLeft < 3600 ? "#DC2626" : "#111827",
                }}
              >
                {formatCountdown(secondsLeft)}
              </span>
            </div>
          )}

          {/* Bid error inline */}
          {bidError && (
            <p className="text-sm text-red-600">
              {bidError.message || "Failed to place bid. Please try again."}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {/* Winning — active auction */}
            {bid.userBidStatus === "WINNING" && !isCompleted && (
              <Button
                onClick={handleViewDetails}
                className="flex-1"
                style={{ backgroundColor: "#E5E5E5", color: "#000" }}
              >
                View Details
              </Button>
            )}

            {/* Outbid — active auction */}
            {bid.userBidStatus === "OUTBID" && !isCompleted && (
              <>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      className="flex-1 bg-primary text-white"
                      disabled={isBidPending}
                    >
                      {isBidPending ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                          Placing...
                        </span>
                      ) : (
                        "Increase Bid"
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4" align="start">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-semibold text-sm">
                          Increase Your Bid
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Current highest bid:{" "}
                          <strong>${bid.highestBid.toFixed(2)}</strong>
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {bidOptions.map((option) => (
                          <Button
                            key={option.percentage}
                            onClick={() => handleBidSelection(option.amount)}
                            variant="outline"
                            disabled={isBidPending}
                            className="flex flex-col h-auto py-3 px-2 hover:bg-primary hover:text-white transition-colors"
                          >
                            <span className="text-xs text-muted-foreground mb-1">
                              +{option.percentage}%
                            </span>
                            <span className="text-base font-semibold">
                              ${option.amount}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  onClick={handleViewDetails}
                  className="flex-1"
                  style={{ backgroundColor: "#E5E5E5", color: "#000" }}
                >
                  View Details
                </Button>
              </>
            )}

            {/* Won / Lost — completed auction */}
            {isCompleted && (
              <Button
                onClick={handleViewDetails}
                className="flex-1"
                style={{ backgroundColor: "#E5E5E5", color: "#000" }}
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
