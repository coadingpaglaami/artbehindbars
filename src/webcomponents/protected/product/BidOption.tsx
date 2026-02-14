"use client";

import { TrendingUp, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetAuctionBids, usePlaceBidMutation } from "@/api/auction";
import { ArtworkResponseDto } from "@/types/gallery.types";
import { useEffect } from "react";
import { PlaceBidDto } from "@/types/auction.type";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";

interface BidOptionProps {
  product: ArtworkResponseDto;
  refetchArtwork: () => void;
}

export const BidOption = ({ product, refetchArtwork }: BidOptionProps) => {
  const [bidAmount, setBidAmount] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [commitmentAccepted, setCommitmentAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState(
    product.auction?.currentPrice || 0,
  );
  console.log(product);

  // Fetch bids for this auction
  const {
    data: bidsData,
    isLoading: isBidsLoading,
    refetch: refetchBids,
  } = useGetAuctionBids(product.auction?.id as string, { page: 1, limit: 10 });

  // Place bid mutation
  const { mutate: placeBidMutate, isPending: isPlacingBid } =
    usePlaceBidMutation();

  useEffect(() => {
    const socket = getSocket();
    if (!socket || !product.auction?.id) return;

    socket.emit("joinAuction", product.auction.id);

    return () => {
      socket.emit("leaveAuction", product.auction?.id);
    };
  }, [product.auction?.id]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewBid = (data: PlaceBidDto & { firstName?: string; lastName?: string }) => {
      if (data.auctionId !== product.auction?.id) return;

      setCurrentPrice(data.bidPrice);
      refetchArtwork(); // update artwork details (if needed)
      refetchBids(); // optional for now

      const bidderName = data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : `User ${data.auctionId || 'Unknown'}`;
      toast.success(`New bid of $${data.bidPrice.toFixed(2)} by ${bidderName}!`, {
        position: "top-right",
        duration: 5000,
      });
    };

    socket.on("auction:newBid", handleNewBid);

    return () => {
      socket.off("auction:newBid", handleNewBid);
    };
  }, [product.auction?.id]);

  const currentBid = currentPrice;
  if (currentBid == null) {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
  const minimumBid = currentPrice * 1.05;

  const quickBidOptions = [
    { label: "+5%", value: Math.ceil(currentBid * 1.05) },
    { label: "+8%", value: Math.ceil(currentBid * 1.08) },
    { label: "+10%", value: Math.ceil(currentBid * 1.1) },
    { label: "+13%", value: Math.ceil(currentBid * 1.13) },
  ];

  const biddingRules = [
    "Bids are binding and cannot be retracted",
    "You will be notified if you are outbid",
    "Winning bidders must complete payment within 48 hours",
    "All sales are final once the auction ends",
  ];

  const formatDateTime = (date: string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return `${month}/${day}/${year} ${displayHours}:${minutes}:${seconds} ${ampm}`;
  };

  const handlePlaceBid = () => {
    const bidValue = parseFloat(bidAmount);

    if (!bidValue || bidValue < minimumBid) {
      setError(`Bid must be at least $${minimumBid}`);
      return;
    }

    if (!termsAccepted || !commitmentAccepted) {
      setError("Please accept all terms and conditions");
      return;
    }

    setError(null);

    placeBidMutate(
      {
        auctionId: product.auction?.id as string,
        bidPrice: bidValue,
      },
      {
        onSuccess: () => {
          setBidAmount("");
          setTermsAccepted(false);
          setCommitmentAccepted(false);
        },
        onError: (error) => {
          setError(error.message || "Failed to place bid");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      {/* Auction Status */}
      <div className="p-4 rounded-lg" style={{ backgroundColor: "#E8F0FE" }}>
        <div
          className="flex items-center gap-2 mb-1"
          style={{ color: "#1447E6" }}
        >
          <TrendingUp size={20} />
          <h3 className="font-semibold text-lg">Current Auction Status</h3>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: "#1447E6" }}>Current Bid:</span>
          <span className="font-bold text-xl" style={{ color: "#1447E6" }}>
            ${currentBid.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Bid Amount Section */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            Enter Your Bid Amount
          </h3>
          <p className="text-sm text-gray-600">
            Minimum bid: ${minimumBid.toFixed(2)} (5% greater than current bid)
          </p>
        </div>

        <Input
          type="number"
          placeholder={`$ ${minimumBid.toFixed(2)} or more`}
          value={bidAmount}
          onChange={(e) => {
            setBidAmount(e.target.value);
            setError(null);
          }}
          className="text-lg"
          disabled={isPlacingBid}
        />

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Quick Bid Options:
          </p>
          <div className="grid grid-cols-4 gap-2">
            {quickBidOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setBidAmount(String(option.value))}
                disabled={isPlacingBid}
                className="py-2 px-3 rounded border text-center transition-colors hover:bg-gray-200 disabled:opacity-50"
                style={{ backgroundColor: "#F5F5F5", borderColor: "#D4D4D4" }}
              >
                <div className="text-xs text-gray-600">{option.label}</div>
                <div className="font-semibold text-sm">
                  ${option.value.toFixed(2)}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div
          className="p-3 rounded space-y-2"
          style={{ backgroundColor: "#F5F5F5", borderColor: "#D4D4D4" }}
        >
          <div className="flex items-start gap-2">
            <Info size={18} className="text-gray-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm text-gray-700">
              {biddingRules.map((rule, idx) => (
                <div key={idx}>• {rule}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300"></div>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              disabled={isPlacingBid}
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <span className="text-primary font-medium">
                bidding terms and conditions
              </span>
            </label>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              checked={commitmentAccepted}
              onCheckedChange={(checked) =>
                setCommitmentAccepted(checked === true)
              }
              disabled={isPlacingBid}
            />
            <label className="text-sm text-gray-700">
              I understand that placing a bid is a binding commitment to
              purchase if I win the auction.
            </label>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Button
          className="w-full bg-primary text-white"
          disabled={
            !termsAccepted ||
            !commitmentAccepted ||
            parseFloat(bidAmount) < minimumBid ||
            isPlacingBid
          }
          onClick={handlePlaceBid}
        >
          {isPlacingBid ? "Placing Bid..." : "Place Bid"}
        </Button>
      </div>

      {/* Bid History */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900">Bid History</h3>

        {isBidsLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {bidsData?.data && bidsData.data.length > 0 ? (
              [...bidsData.data]
  .sort((a, b) => b.bidPrice - a.bidPrice)
  .map((bid, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {bid.firstName && bid.lastName
                        ? `${bid.firstName} ${bid.lastName}`
                        : `User ${bid.userId.slice(0, 8)}`}
                    </div>
                    <div className="text-xs text-gray-600">
                      {formatDateTime(bid.createdAt.toString())}
                    </div>
                  </div>
                  <div className="font-semibold" style={{ color: "#1447E6" }}>
                    ${bid.bidPrice.toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No bids yet. Be the first to bid!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
