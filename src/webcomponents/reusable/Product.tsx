"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { isClientAuthenticated } from "@/lib/auth-client";
import { ArtworkResponseDto } from "@/types/gallery.types";
import { useEffect, useState } from "react";

export interface ProductCardProps {
  product: ArtworkResponseDto;
  buttonText: string[];
}

export const Product = ({ product, buttonText }: ProductCardProps) => {
  const isAuthenticated = isClientAuthenticated();
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!product.auction) return;

    const updateTimer = () => {
      if (product.auction?.status === "Ended") {
        setTimeLeft("Ended");
        return;
      }

      if (product.auction?.status === "Upcoming") {
        const startDate = new Date(product.auction.startAt);
        setTimeLeft(`Starts at ${startDate.toLocaleString()}`);
        return;
      }

      // Ongoing
      const now = new Date().getTime();
      const endTime = new Date(product.auction?.endAt ?? "").getTime();
      const remaining = endTime - now;

      if (remaining <= 0) {
        setTimeLeft("Ended");
        return;
      }

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // update every minute

    return () => clearInterval(interval);
  }, [product.auction]);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
      {/* Sold Out Overlay - Will be used when isSoldOut is implemented */}
      {product.isSold && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-xs z-10 flex items-center justify-center">
          <div
            className="bg-red-600 text-white font-bold text-2xl px-8 py-3 rounded-md shadow-lg"
            style={{ transform: "rotate(-12deg)" }}
          >
            SOLD OUT
          </div>
        </div>
      )}

      {/* Image Section - Full Width */}
      <div className="relative w-full aspect-4/3">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 space-y-3">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        {/* Artist Name */}
        <p className="text-gray-600">
          by {product.artist?.name || "Unknown Artist"}
        </p>

        {/* Category Badge */}
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.category}
          </span>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Price Information - Full details when NOT sold out */}
        {!product.isSold && (
          <div className="space-y-2">
            {/* Buy It Now */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Buy It Now</span>
              <span className="text-[#008236] font-semibold">
                ${product.buyItNowPrice.toFixed(2)}
              </span>
            </div>

            {/* Current Bid - Will show actual bid when auction API is integrated */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Current Bid</span>
              <span className="text-[#1447E6] font-semibold">
                $
                {typeof product.auction?.currentPrice === "number"
                  ? product.auction.currentPrice?.toFixed(2)
                  : ""}
              </span>
            </div>
            {/* Future implementation when auction is live:
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Current Bid</span>
              <span className="text-[#1447E6] font-semibold">
                ${product.currentBid?.toFixed(2) || product.auctionPrice.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {product.totalBids || 0} bid(s)
            </div>
            */}
          </div>
        )}

        {/* Show only Buy It Now price for sold out items */}
        {product.isSold && (
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Final Price</span>
            <span className="text-[#008236] font-semibold">
              ${product.buyItNowPrice.toFixed(2)}
            </span>
          </div>
        )}

        {/* Remaining Time - Hide for sold out */}
        {!product.isSold && (
          <div className="flex items-center gap-2 text-[#F54900]">
            <Clock size={18} />
            <span className="font-medium">{timeLeft}</span>
          </div>
        )}
        {/* Future auction ended state:
        {isAuctionEnded() && !product.isSoldOut && (
          <div className="flex items-center gap-2 text-gray-500">
            <Clock size={18} />
            <span className="font-medium">Auction Ended</span>
          </div>
        )}
        */}

        {/* Action Buttons - Hide for sold out */}
        {!product.isSold && (
          <div className="flex gap-2 pt-2">
            {isAuthenticated ? (
              <>
                <button
                  className="flex-1 py-2.5 px-4 rounded-md font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#155DFC" }}
                  onClick={() => router.push(`/product/${product.id}`)}
                  // disabled={isAuctionEnded()} // Will be used when auction logic is implemented
                >
                  {buttonText[0] || "Make a Bid"}
                </button>
                <button
                  className="flex-1 py-2.5 px-4 rounded-md font-semibold text-white transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#00A63E" }}
                  onClick={() => {
                    // Buy Now logic will be implemented
                    console.log("Buy Now clicked for:", product.id);
                  }}
                >
                  {buttonText[1] || "Buy Now"}
                </button>
              </>
            ) : (
              <button
                className="w-full py-2.5 px-4 rounded-md font-semibold text-gray-700 transition-colors hover:opacity-90"
                style={{ backgroundColor: "#D4D4D4" }}
                onClick={() => router.push("/login")}
              >
                {buttonText[0] || "Login to Bid"}
              </button>
            )}
          </div>
        )}

        {/* View Details button for sold out items */}
        {product.isSold && (
          <button
            className="w-full py-2.5 px-4 rounded-md font-semibold text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: "#94A3B8" }}
            onClick={() => router.push(`/product/${product.id}`)}
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};
