"use client";

import { ArtworkResponseDto } from "@/types/gallery.types";
import { CheckCircle2, Tag, User, Calendar, Layers } from "lucide-react";
import Image from "next/image";

interface SoldArtworkViewProps {
  product: ArtworkResponseDto;
}

export const SoldArtworkView = ({ product }: SoldArtworkViewProps) => {
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
    });

  const artistName = product.isAnonymous
    ? "Anonymous"
    : product.artist?.name || "Unknown Artist";

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left — Artwork image with SOLD overlay */}
          <div className="lg:w-1/3">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  width={600}
                  height={700}
                  className="w-full object-cover grayscale"
                />
              )}
              {/* SOLD overlay badge */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg rotate-[-10deg]">
                  <span className="text-2xl font-black tracking-widest text-gray-900 uppercase">
                    Sold
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Artwork info only, no action buttons */}
          <div className="lg:w-2/3 space-y-6">
            {/* Title + sold badge */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                  This artwork has been sold
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>
            </div>

            <hr className="border-gray-100" />

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Artist */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                    Artist
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {artistName}
                  </p>
                </div>
              </div>

              {/* Category */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <Layers className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                    Category
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* Sale price */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <Tag className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                    Sold For
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {product.auction
                      ? formatPrice(product.auction.currentPrice)
                      : formatPrice(product.buyItNowPrice)}
                  </p>
                </div>
              </div>

              {/* Date listed */}
              <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                    Listed On
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {formatDate(product.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Auction winner info if available */}
            {product.auction?.highestBidderName && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Won by
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  {product.auction.highestBidderName}
                </p>
              </div>
            )}

            {/* Footer note */}
            <p className="text-sm text-gray-400 italic">
              This artwork is no longer available for purchase or bidding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};