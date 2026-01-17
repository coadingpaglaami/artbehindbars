import { Bid } from "@/interface/bid";
import Image from "next/image";
import { TrendingUp, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MyBidsHistory = ({ bid }: { bid: Bid }) => {
  const getStatusConfig = () => {
    switch (bid.bidStatus) {
      case "Winning":
        return {
          color: "#00A63E",
          bgColor: "#E8F5E9",
          icon: <TrendingUp size={20} />,
          text: "Winning",
        };
      case "Outbid":
        return {
          color: "#F97316",
          bgColor: "#FFF7ED",
          icon: <AlertTriangle size={20} />,
          text: "Outbid",
        };
      case "Lost":
        return {
          color: "#DC2626",
          bgColor: "#FEE2E2",
          icon: <XCircle size={20} />,
          text: "Lost",
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Side - Image (25%) */}
        <div className="relative w-full md:w-1/4 aspect-square md:aspect-auto">
          <Image
            src={bid.artworkImage}
            alt={bid.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side - Content (75%) */}
        <div className="flex-1 p-4 space-y-3">
          {/* Title, Artist and Status */}
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {bid.title}
              </h3>
              <p className="text-gray-600">by {bid.artist}</p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full font-medium whitespace-nowrap"
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
          <div className="border-b border-gray-300"></div>

          {/* Bid Information */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* My Bid */}
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">My Bid</span>
              <span className="text-lg font-semibold text-gray-900">
                ${bid.userBid}
              </span>
            </div>

            {/* Current Bid */}
            <div className="flex flex-col gap-1 sm:ml-auto">
              <span className="text-sm text-gray-600">Current Bid</span>
              <span className="text-lg font-semibold text-gray-900">
                ${bid.currentBid}
              </span>
            </div>
          </div>

          {/* Auction End Date for Lost/Completed */}
          {bid.isCompleted && bid.auctionEndDate && (
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Auction Ended</span>
              <span className="text-gray-900 font-medium">
                {bid.auctionEndDate}
              </span>
            </div>
          )}

          {/* Divider */}
          <div className="border-b border-gray-300"></div>

          {/* Time Remaining - Hidden for Lost bids */}
          {!bid.isCompleted && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <Clock size={18} />
                <span className="font-medium">Time Remaining</span>
              </div>
              <span className="text-gray-900 font-medium">
                {bid.timeRemaining}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {bid.bidStatus === "Winning" && !bid.isCompleted && (
              <Button
                onClick={bid.onViewDetails}
                className="flex-1"
                style={{ backgroundColor: "#E5E5E5", color: "#000" }}
              >
                View Details
              </Button>
            )}

            {bid.bidStatus === "Outbid" && !bid.isCompleted && (
              <>
                <Button
                  onClick={bid.onIncreaseBid}
                  className="flex-1 bg-primary text-white"
                >
                  Increase Bid
                </Button>
                <Button
                  onClick={bid.onViewDetails}
                  className="flex-1"
                  style={{ backgroundColor: "#E5E5E5", color: "#000" }}
                >
                  View Details
                </Button>
              </>
            )}

            {bid.isCompleted && (
              <Button
                onClick={bid.onViewDetails}
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