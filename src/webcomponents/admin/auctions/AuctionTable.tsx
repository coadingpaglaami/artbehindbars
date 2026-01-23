"use client";

import { AuctionArtwork } from "@/interface/admin";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuctionDialogue } from "./AuctionDialogue";

interface AuctionTableProps {
  auctions: AuctionArtwork[];
}

export const AuctionTable = ({ auctions }: AuctionTableProps) => {
  const [selectedAuction, setSelectedAuction] = useState<AuctionArtwork | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return { color: "#03543F" };
      case "Ended":
        return { color: "#6B7280" };
      case "Not Started":
        return { color: "#C2410C" };
      default:
        return { color: "#6B7280" };
    }
  };

  const parseTimeRemaining = (timeRemaining: string) => {
    // Parse format like "2d 5h 30m"
    const parts = timeRemaining.split(" ");
    let totalSeconds = 0;

    parts.forEach((part) => {
      if (part.endsWith("d")) {
        totalSeconds += parseInt(part) * 24 * 60 * 60;
      } else if (part.endsWith("h")) {
        totalSeconds += parseInt(part) * 60 * 60;
      } else if (part.endsWith("m")) {
        totalSeconds += parseInt(part) * 60;
      } else if (part.endsWith("s")) {
        totalSeconds += parseInt(part);
      }
    });

    return totalSeconds;
  };

  const formatTimeRemaining = (timeRemaining: string) => {
    const seconds = parseTimeRemaining(timeRemaining);
    
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    return (
      <div className="flex items-center gap-1 text-blue-600">
        <Clock size={16} />
        <span className="font-mono">
          {days}d {hours}h {minutes}m {secs}s
        </span>
      </div>
    );
  };

  const handleManage = (auction: AuctionArtwork) => {
    setSelectedAuction(auction);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr className="border-b" style={{ borderColor: "#E2E8F0" }}>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Artwork
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Current Bid
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Highest Bidder
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Time Remaining
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {auctions.map((auction) => {
                const statusStyle = getStatusStyle(auction.status);
                return (
                  <tr
                    key={auction.artworkId}
                    className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    {/* Artwork */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={auction.artworkImage}
                            alt={auction.artworkTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium text-gray-900">
                          {auction.artworkTitle}
                        </div>
                      </div>
                    </td>

                    {/* Current Bid */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500">$</span>
                        <span className="font-semibold text-gray-900">
                          {auction.currentBid}
                        </span>
                      </div>
                    </td>

                    {/* Highest Bidder */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        <span className="text-gray-700">
                          {auction.status === "Not Started"
                            ? "-"
                            : auction.highestBidder}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className="font-medium"
                        style={{ color: statusStyle.color }}
                      >
                        {auction.status}
                      </span>
                    </td>

                    {/* Time Remaining */}
                    <td className="px-6 py-4">
                      {auction.status === "Active" ? (
                        formatTimeRemaining(auction.timeRemaining)
                      ) : auction.status === "Ended" ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={16} />
                          <span>Ended</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-orange-600">
                          <Clock size={16} />
                          <span>Starts Soon</span>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {auction.status !== "Ended" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManage(auction)}
                        >
                          Manage
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AuctionDialogue
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedAuction(null);
        }}
        auction={selectedAuction}
      />
    </>
  );
};