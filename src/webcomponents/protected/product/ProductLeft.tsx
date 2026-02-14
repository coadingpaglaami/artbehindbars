"use client";

import { Clock, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArtworkResponseDto } from "@/types/gallery.types";
import { useGetAuction } from "@/api/auction";

interface ProductLeftProps {
  product: ArtworkResponseDto;
  onModeChange: (mode: "bid" | "buy") => void;
  mode: "bid" | "buy";
  isAuthenticated: boolean;
}

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const ProductLeft = ({
  product,
  onModeChange,
  mode,
  isAuthenticated,
}: ProductLeftProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const { data } = useGetAuction(product.auction?.id as string);

  useEffect(() => {
    if (!product.auction?.endAt) return;

    const calculateTimeLeft = () => {
      const now = Date.now();
      const endAt = product.auction?.endAt;

      if (!endAt) return;

      const end = new Date(endAt).getTime();
      const difference = end - now;

      if (difference <= 0) {
        setTimeLeft(null); // auction ended
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    calculateTimeLeft(); // run immediately

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [product.auction?.endAt]);

  const currentBid = data?.currentPrice;
  const shippingCost = 15;
  const totalPrice = product.buyItNowPrice + shippingCost;

  const purchaseRules = [
    "All artwork sales are final",
    "Certificate of authenticity included",
    "Secure payment processing",
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title and Artist */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {product.title}
          </h3>
          <p className="text-gray-600">by {product.artist?.name}</p>
        </div>

        {/* Category Badge */}
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.category}
          </span>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Price Information - Changes based on mode */}
        {mode === "bid" ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Current Bid</span>
              <span className="font-semibold" style={{ color: "#1447E6" }}>
                ${currentBid?.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Buy It Now</span>
              <span className="font-semibold" style={{ color: "#008236" }}>
                ${product.buyItNowPrice.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Artwork Price</span>
              <span className="font-semibold text-gray-900">
                ${product.buyItNowPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Shipping & Handling</span>
              <span className="font-semibold text-gray-900">
                ${shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="border-b border-gray-300"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-xl" style={{ color: "#008236" }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Countdown Timer or Purchase Rules */}
        {mode === "bid" ? (
          product?.auction?.status === "Ongoing" ? (
            <div>
              <div
                className="flex items-center gap-2 text-sm mb-2"
                style={{ color: "#F54900" }}
              >
                <Clock size={18} />
                <span className="font-medium">Auction ends in</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: timeLeft?.days, label: "Days" },
                  { value: timeLeft?.hours, label: "Hours" },
                  { value: timeLeft?.minutes, label: "Min" },
                  { value: timeLeft?.seconds, label: "Sec" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="bg-black text-white w-full py-2 rounded text-center font-bold">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-green-50 border border-green-200 text-green-700 rounded">
              This auction has ended
            </div>
          )
        ) : (
          <div className="space-y-2">
            {purchaseRules.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle
                  size={18}
                  className="text-green-500 shrink-0 mt-0.5"
                />
                <span className="text-sm text-gray-700">{rule}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons - Only show if authenticated */}
        {isAuthenticated && (
          <>
            {mode === "bid" ? (
              <Button
                className="w-full text-white font-semibold"
                style={{ backgroundColor: "#00A63E" }}
                onClick={() => onModeChange("buy")}
              >
                Buy It Now
              </Button>
            ) : (
              <Button
                className="w-full text-white font-semibold"
                style={{ backgroundColor: "#1447E6" }}
                onClick={() => onModeChange("bid")}
              >
                Switch to Bidding
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
