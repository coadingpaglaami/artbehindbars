/* eslint-disable react-hooks/purity */
"use client";

import { ProductLeft } from "./ProductLeft";
import { BidOption } from "./BidOption";
import { BuyOption } from "./BuyOption";
import { useState } from "react";

import { useGetArtworkById } from "@/api/gallary";
import { UnauthenticatedView } from "./UnAuthenticateView";
import { ArtworkResponseDto } from "@/types/gallery.types";
import { SoldArtworkView } from "./SoldArtworkView";
import { AuctionEndedView } from "./AuctionEndedView";
import { useAuth } from "@/api/auth";

export const ProductInformation = ({ productId }: { productId: string }) => {
  const [mode, setMode] = useState<"bid" | "buy">("bid");
  const { isAuthenticated } = useAuth();

  const {
    data: artwork,
    isLoading,
    isError,
    error,
    refetch,
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

  // If artwork is sold, replace entire UI with sold view
  if (artwork.isSold) {
    return <SoldArtworkView product={artwork as ArtworkResponseDto} />;
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
    isSoldOut: false,
    remainingTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  };

  // Auction is considered ended if there's no auction at all, or status is "Ended"
  const isAuctionEnded =
    !artwork.auction || artwork.auction.status === "Ended";

  const renderRightPanel = () => {
    if (!isAuthenticated) {
      return <UnauthenticatedView mode={mode} />;
    }

    if (mode === "buy") {
      return <BuyOption product={productData} artworkId={productId} />;
    }

    // mode === "bid"
    if (isAuctionEnded) {
      return <AuctionEndedView product={artwork as ArtworkResponseDto} />;
    }

    return (
      <BidOption
        product={artwork as ArtworkResponseDto}
        refetchArtwork={refetch}
      />
    );
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Product Card */}
          <div className="lg:w-1/3">
            <ProductLeft
              product={artwork as ArtworkResponseDto}
              onModeChange={setMode}
              mode={mode}
              isAuthenticated={isAuthenticated}
            />
          </div>

          {/* Right Side - Bid, Buy Options, or Login Prompt */}
          <div className="lg:w-2/3">{renderRightPanel()}</div>
        </div>
      </div>
    </div>
  );
};