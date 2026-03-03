"use client";

import { ArtworkResponseDto } from "@/types/gallery.types";
import { Trophy, Clock, User, TrendingUp, Ban } from "lucide-react";

interface AuctionEndedViewProps {
  product: ArtworkResponseDto;
}

export const AuctionEndedView = ({ product }: AuctionEndedViewProps) => {
  const auction = product.auction;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const userBidStatus = auction?.userBidStatus;

  const statusConfig = {
    WINNING: {
      label: "You won this auction!",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
      icon: <Trophy className="w-5 h-5 text-emerald-600" />,
    },
    OUTBID: {
      label: "You were outbid",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
      icon: <TrendingUp className="w-5 h-5 text-amber-600" />,
    },
    LOST: {
      label: "Auction ended — you didn't win",
      color: "text-red-500",
      bg: "bg-red-50 border-red-200",
      icon: <Ban className="w-5 h-5 text-red-500" />,
    },
    NOT_PARTICIPATED: {
      label: "You did not participate in this auction",
      color: "text-gray-500",
      bg: "bg-gray-50 border-gray-200",
      icon: <Clock className="w-5 h-5 text-gray-400" />,
    },
  };

  const status = userBidStatus ? statusConfig[userBidStatus] : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Auction Ended</h2>
          <p className="text-sm text-gray-500">
            This auction has concluded and is no longer active.
          </p>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* User bid status banner */}
      {status && (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${status.bg}`}
        >
          {status.icon}
          <span className={`text-sm font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>
      )}

      {/* Auction summary */}
      {auction && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Starting Price
            </p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(auction.startPrice)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Final Price
            </p>
            <p className="text-xl font-bold text-gray-900">
              {formatPrice(auction.currentPrice)}
            </p>
          </div>

          {auction.endAt && (
            <div className="col-span-2 bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Ended At
              </p>
              <p className="text-sm font-medium text-gray-700">
                {formatDate(auction.endAt)}
              </p>
            </div>
          )}

          {auction.highestBidderName && (
            <div className="col-span-2 bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Won by
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {auction.highestBidderName}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No auction data fallback */}
      {!auction && (
        <div className="text-center py-8 text-gray-400">
          <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="text-sm">No auction details available.</p>
        </div>
      )}
    </div>
  );
};