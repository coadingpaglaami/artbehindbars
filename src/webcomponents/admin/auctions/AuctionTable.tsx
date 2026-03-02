"use client";

import {
  AuctionResponseDto,
  AuctionStatus,
  GetAuctionsQueryDto,
} from "@/types/auction.type"; // Adjust path
import { Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AuctionDialogue } from "./AuctionDialogue";

interface AuctionTableProps {
  auctions: AuctionResponseDto[];
  queryParams: GetAuctionsQueryDto;
}

export const AuctionTable = ({ auctions, queryParams }: AuctionTableProps) => {
  const [selectedAuction, setSelectedAuction] =
    useState<AuctionResponseDto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setCurrentTime] = useState(new Date());

  // Tick every second to keep countdowns live
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusStyle = (status: AuctionStatus) => {
    switch (status) {
      case "Ongoing":
        return { color: "#03543F" };
      case "Ended":
        return { color: "#6B7280" };
      case "Upcoming":
        return { color: "#C2410C" };
      default:
        return { color: "#6B7280" };
    }
  };

  const getStatusLabel = (status: AuctionStatus) => {
    switch (status) {
      case "Ongoing":
        return "Active";
      case "Upcoming":
        return "Not Started";
      case "Ended":
        return "Ended";
    }
  };

  // Calculate live countdown from endAt ISO string
  const formatCountdown = (endAt: string) => {
    // eslint-disable-next-line react-hooks/purity
    const diffMs = new Date(endAt).getTime() - Date.now();
    if (diffMs <= 0) return null;

    const totalSecs = Math.floor(diffMs / 1000);
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    return (
      <div className="flex items-center gap-1 text-blue-600">
        <Clock size={16} />
        <span className="font-mono">
          {d}d {h}h {m}m {s}s
        </span>
      </div>
    );
  };

  // Calculate time until start for Upcoming auctions
  const formatStartsIn = (startAt: string) => {
    // eslint-disable-next-line react-hooks/purity
    const diffMs = new Date(startAt).getTime() - Date.now();
    if (diffMs <= 0) return "Starting soon";

    const totalSecs = Math.floor(diffMs / 1000);
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);

    return `in ${d > 0 ? `${d}d ` : ""}${h > 0 ? `${h}h ` : ""}${m}m`;
  };

  const handleManage = (auction: AuctionResponseDto) => {
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
                  Start Price
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
                const countdown =
                  auction.status === "Ongoing"
                    ? formatCountdown(auction.endAt)
                    : null;

                return (
                  <tr
                    key={auction.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    {/* Artwork */}
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {auction.artworkTitle}
                      </div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        ID: {auction.artworkId.slice(0, 8)}...
                      </div>
                    </td>

                    {/* Current Bid */}
                    <td className="px-6 py-4">
                      <div className="flex gap-1 items-center">
                        <span className="text-sm text-gray-500">$</span>
                        <span className="font-semibold text-gray-900">
                          {auction.currentPrice.toFixed(2)}
                        </span>
                      </div>
                    </td>

                    {/* Start Price */}
                    <td className="px-6 py-4">
                      <div className="flex gap-1 items-center">
                        <span className="text-sm text-gray-500">$</span>
                        <span className="text-gray-700">
                          {auction.startPrice.toFixed(2)}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className="font-medium"
                        style={{ color: statusStyle.color }}
                      >
                        {getStatusLabel(auction.status)}
                      </span>
                    </td>

                    {/* Time Remaining */}
                    <td className="px-6 py-4">
                      {auction.status === "Ongoing" ? (
                        (countdown ?? (
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock size={16} />
                            <span>Ending...</span>
                          </div>
                        ))
                      ) : auction.status === "Ended" ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <Clock size={16} />
                          <span>Ended</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-orange-600">
                          <Clock size={16} />
                          <span>Starts {formatStartsIn(auction.startAt)}</span>
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
        queryParams={queryParams}
      />
    </>
  );
};
