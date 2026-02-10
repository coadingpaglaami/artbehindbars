/* eslint-disable react-hooks/purity */
"use client";

import { ProductLeft } from "./ProductLeft";
import { BidOption } from "./BidOption";
import { BuyOption } from "./BuyOption";
import { useState } from "react";
import { isClientAuthenticated } from "@/lib/auth-client";
import { useGetArtworkById } from "@/api/gallary";
import { UnauthenticatedView } from "./UnAuthenticateView";

export const ProductInformation = ({ productId }: { productId: string }) => {
  const [mode, setMode] = useState<"bid" | "buy">("bid");
  const isAuthenticated = isClientAuthenticated();

  // Fetch artwork details
  const {
    data: artwork,
    isLoading,
    isError,
    error,
  } = useGetArtworkById(productId);

  if (isLoading) {
    return (
      <div className="py-16 px-4">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-16 px-4">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-center">
          Error loading artwork: {error?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="py-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Product not found
          </h2>
          <p className="text-gray-600 mt-2">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  // Convert API response to ProductProps format
  const productData = {
    productId: artwork.id,
    productTitle: artwork.title,
    productArtist: artwork.isAnonymous
      ? "Anonymous"
      : artwork.artist?.name || "Unknown Artist",
    productPrice: artwork.buyItNowPrice,
    auctionPrice: artwork.startingBidPrice,
    prouductPhoto: artwork.imageUrl,
    productCategory: artwork.category,
    // isSoldOut: artwork.isSoldOut, // Will be uncommented when API supports it
    isSoldOut: false,
    // remainingTime: new Date(artwork.auctionEndTime), // Will be added when API supports it
    remainingTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    // bitHistory: artwork.bidHistory, // Will be added when API supports it
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Product Card */}
          <div className="lg:w-1/3">
            <ProductLeft
              product={productData}
              onModeChange={setMode}
              mode={mode}
              isAuthenticated={isAuthenticated}
            />
          </div>

          {/* Right Side - Bid, Buy Options, or Login Prompt */}
          <div className="lg:w-2/3">
            {isAuthenticated ? (
              mode === "bid" ? (
                <BidOption product={productData} artworkId={productId} />
              ) : (
                <BuyOption product={productData} artworkId={productId} />
              )
            ) : (
              <UnauthenticatedView mode={mode} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};