"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, User, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  useExtendAuction,
  useGetAuctionBids,
} from "@/api/auction"; // Adjust path
import { AuctionResponseDto, GetAuctionsQueryDto } from "@/types/auction.type";

interface AuctionDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  auction: AuctionResponseDto | null;
  queryParams: GetAuctionsQueryDto;
}

export const AuctionDialogue = ({
  isOpen,
  onClose,
  auction,
  queryParams,
}: AuctionDialogueProps) => {
  const queryClient = useQueryClient();

  // New end date/time state — default 2 days from now
  // eslint-disable-next-line react-hooks/purity
  const twoDaysFromNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
  const [newEndDate, setNewEndDate] = useState<Date | undefined>(twoDaysFromNow);
  const [newEndTime, setNewEndTime] = useState<string>(
    format(twoDaysFromNow, "HH:mm"),
  );

  const { mutate: extendAuction, isPending: isExtending, error: extendError, isSuccess: isExtendSuccess } =
    useExtendAuction();

  // Only fetch bids when dialog is open and auction is Ongoing
  const { data: bidsData, isLoading: bidsLoading } = useGetAuctionBids(
    auction?.id ?? "",
    { page: 1, limit: 10 },
  );

  if (!auction) return null;

  const bids = bidsData?.data ?? [];

  // Build ISO from date picker + time input → "2026-02-13T14:30:00Z"
  const buildNewEndAtISO = (): string | null => {
    if (!newEndDate) return null;
    const [hours, minutes] = newEndTime.split(":").map(Number);
    const result = new Date(newEndDate);
    result.setHours(hours, minutes, 0, 0);
    return result.toISOString().replace(/\.\d{3}Z$/, "Z");
  };

  const isNewEndValid = (): boolean => {
    const iso = buildNewEndAtISO();
    if (!iso) return false;
    // Must be after current endAt
    return new Date(iso).getTime() > new Date(auction.endAt).getTime();
  };

  const handleExtend = () => {
    const newEndAt = buildNewEndAtISO();
    if (!newEndAt || !isNewEndValid()) return;

    extendAuction(
      { id: auction.id, payload: { newEndAt } },
      {
        onSuccess: () => {
          // Invalidate auction list so table refreshes
          queryClient.invalidateQueries({ queryKey: ["auctions"] });
        },
      },
    );
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const getStatusLabel = () => {
    switch (auction.status) {
      case "Ongoing":  return { label: "Active",      color: "#03543F", bg: "#F0FDF4" };
      case "Upcoming": return { label: "Not Started", color: "#C2410C", bg: "#FFF7ED" };
      case "Ended":    return { label: "Ended",       color: "#6B7280", bg: "#F9FAFB" };
    }
  };

  const statusInfo = getStatusLabel();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-semibold">
              Auction Details
            </DialogTitle>
            <span
              className="px-3 py-1 rounded-full text-sm font-semibold mr-6"
              style={{ color: statusInfo.color, backgroundColor: statusInfo.bg }}
            >
              {statusInfo.label}
            </span>
          </div>
        </DialogHeader>

        <div className="flex gap-6 py-4">
          {/* Left Side — Auction Info */}
          <div className="w-1/3 space-y-3">
            {/* Artwork Title */}
            <h3 className="font-semibold text-gray-900 text-lg">
              {auction.artworkTitle}
            </h3>

            {/* Timing Info */}
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-500">Start</p>
                <p className="font-medium text-gray-900">
                  {formatDate(auction.startAt)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">End</p>
                <p className="font-medium text-gray-900">
                  {formatDate(auction.endAt)}
                </p>
              </div>
            </div>

            {auction.status === "Ongoing" && (
              <div className="flex items-center gap-2 text-green-600">
                <Clock size={16} />
                <span className="text-sm font-medium">
                  Ends {formatDate(auction.endAt)}
                </span>
              </div>
            )}

            {auction.status === "Upcoming" && (
              <div className="flex items-center gap-2 text-orange-600">
                <Clock size={16} />
                <span className="text-sm font-medium">
                  Starts {formatDate(auction.startAt)}
                </span>
              </div>
            )}
          </div>

          {/* Right Side — Bids + Actions */}
          <div className="flex-1 space-y-4">
            {/* Current Highest Bid */}
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <p className="text-sm text-gray-600 mb-1">Current Highest Bid</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${auction.currentPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Starting price: ${auction.startPrice.toFixed(2)}
              </p>
            </div>

            {/* Bid History — Ongoing only */}
            {auction.status === "Ongoing" && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Bid History
                </h4>
                <div className="bg-white rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead style={{ backgroundColor: "#F8FAFC" }}>
                      <tr className="border-b" style={{ borderColor: "#E2E8F0" }}>
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
                      {bidsLoading ? (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400 text-sm">
                            <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-blue-600 border-r-transparent" />
                          </td>
                        </tr>
                      ) : bids.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-gray-400 text-sm">
                            No bids yet
                          </td>
                        </tr>
                      ) : (
                        bids.map((bid, idx) => (
                          <tr
                            key={idx}
                            className="border-b last:border-0"
                            style={{ borderColor: "#E2E8F0" }}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2 text-gray-900">
                                <User size={14} className="text-gray-400" />
                                {bid.firstName ?? bid.userId}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold text-gray-900">
                              ${bid.bidPrice.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-gray-500 text-sm">
                              {formatDate(bid.createdAt)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Extend Auction — Ongoing only */}
            {auction.status === "Ongoing" && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Extend Auction</h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New End Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Date Picker */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !newEndDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon size={16} className="mr-2 shrink-0" />
                          {newEndDate
                            ? format(newEndDate, "MMM dd, yyyy")
                            : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={newEndDate}
                          onSelect={(date) => setNewEndDate(date ?? undefined)}
                          // Must be after current endAt
                          disabled={(date) =>
                            date <=
                            new Date(
                              new Date(auction.endAt).setHours(0, 0, 0, 0),
                            )
                          }
                          autoFocus
                        />
                      </PopoverContent>
                    </Popover>

                    {/* Time Input */}
                    <div className="relative">
                      <Clock
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                      <Input
                        type="time"
                        value={newEndTime}
                        onChange={(e) => setNewEndTime(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  {/* ISO preview */}
                  {newEndDate && (
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      →{" "}
                      <span
                        className={
                          isNewEndValid() ? "text-blue-600" : "text-red-500"
                        }
                      >
                        {buildNewEndAtISO()}
                      </span>
                      {!isNewEndValid() && (
                        <span className="text-red-500 ml-2">
                          Must be after current end date
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {/* Error */}
                {extendError && (
                  <div
                    className="p-3 rounded-lg border flex items-start gap-2"
                    style={{ backgroundColor: "#FEF2F2", borderColor: "#FECACA" }}
                  >
                    <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">
                      {extendError.message || "Failed to extend auction"}
                    </p>
                  </div>
                )}

                {/* Success */}
                {isExtendSuccess && (
                  <div
                    className="p-3 rounded-lg border flex items-start gap-2"
                    style={{ backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" }}
                  >
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-green-800">
                      Auction extended successfully!
                    </p>
                  </div>
                )}

                <Button
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleExtend}
                  disabled={isExtending || !isNewEndValid() || isExtendSuccess}
                >
                  {isExtending ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                      Extending...
                    </span>
                  ) : (
                    "Extend Auction"
                  )}
                </Button>
              </div>
            )}

            {/* Not Started State */}
            {auction.status === "Upcoming" && (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">Auction has not started yet</p>
                <p className="text-xs mt-1">No bids have been placed</p>
                <p className="text-xs mt-3 text-orange-600 font-medium">
                  Starts {formatDate(auction.startAt)}
                </p>
              </div>
            )}

            {/* Ended State */}
            {auction.status === "Ended" && (
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
                  <Clock size={18} />
                  <span className="font-medium">Auction Ended</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Ended {formatDate(auction.endAt)}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};