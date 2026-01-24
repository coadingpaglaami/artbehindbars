"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AuctionArtwork } from "@/interface/admin";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuctionDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  auction: AuctionArtwork | null;
}

// Mock bid history data
const bidHistory = [
  { bidder: "user123", amount: 450, time: "2 hours ago" },
  { bidder: "artlover99", amount: 420, time: "5 hours ago" },
];

export const AuctionDialogue = ({
  isOpen,
  onClose,
  auction,
}: AuctionDialogueProps) => {
  const [endDateValue, setEndDateValue] = useState<string>(() =>
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
  );

  if (!auction) return null;

  const getEndDate = () => {
    // Mock end date calculation
    const now = new Date();
    now.setDate(now.getDate() + 2);
    return now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-175">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold">
            Auction Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 py-4">
          {/* Left Side - Image and Title */}
          <div className="w-1/3 space-y-3">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              <Image
                src={auction.artworkImage}
                alt={auction.artworkTitle}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="font-semibold text-gray-900">
              {auction.artworkTitle}
            </h3>
            {auction.status === "Active" && (
              <div className="flex items-center gap-2 text-green-600">
                <Clock size={16} />
                <span className="text-sm">Ends {getEndDate()}</span>
              </div>
            )}
          </div>

          {/* Right Side - Bid Information */}
          <div className="flex-1 space-y-4">
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Current Highest Bid</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${auction.currentBid}
                  </span>
                  <span className="text-gray-600">
                    by{" "}
                    {auction.status === "Not Started"
                      ? "none"
                      : auction.highestBidder}
                  </span>
                </div>
              </div>
            </div>

            {/* Bid History - Hidden for Not Started and Ended */}
            {auction.status === "Active" && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Bid History
                </h4>
                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead style={{ backgroundColor: "#F8FAFC" }}>
                      <tr
                        className="border-b"
                        style={{ borderColor: "#E2E8F0" }}
                      >
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Bidder
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="border-b"
                        style={{ borderColor: "#E2E8F0" }}
                      >
                        <td className="px-4 py-3 text-gray-900">
                          {auction.highestBidder}
                        </td>
                        <td className="px-4 py-3 text-gray-900">
                          ${auction.currentBid}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {bidHistory[0].time}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-gray-700">
                          {bidHistory[1].bidder}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          ${bidHistory[1].amount}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {bidHistory[1].time}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Date Field and Action Button - Only for Active */}
            {auction.status === "Active" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <Input
                    type="datetime-local"
                    value={endDateValue}
                    onChange={(e) => setEndDateValue(e.target.value)}
                  />
                </div>
                <Button className="w-full" disabled>
                  Extend Auction
                </Button>
              </div>
            )}

            {/* Not Started State */}
            {auction.status === "Not Started" && (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">Auction has not started yet</p>
                <p className="text-xs mt-1">No bids have been placed</p>
              </div>
            )}

            {/* Ended State */}
            {auction.status === "Ended" && (
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                  <Clock size={18} />
                  <span className="font-medium">Auction Ended</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
