"use client";

import { ProductProps } from "@/interface/product";
import { TrendingUp, Info, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const bidSchema = z.object({
  bidAmount: z.number().min(1, "Bid amount is required"),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
  commitmentAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the commitment",
  }),
});

interface BidOptionProps {
  product: ProductProps;
}

export const BidOption = ({ product }: BidOptionProps) => {
  const currentBid = product.bitHistory?.[product.bitHistory.length - 1]?.value || product.auctionPrice || 0;
  const minimumBid = Math.ceil(currentBid * 1.05);
  
  const [bidAmount, setBidAmount] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [commitmentAccepted, setCommitmentAccepted] = useState(false);

  const quickBidOptions = [
    { label: "+5%", value: Math.ceil(currentBid * 1.05) },
    { label: "+8%", value: Math.ceil(currentBid * 1.08) },
    { label: "+10%", value: Math.ceil(currentBid * 1.10) },
    { label: "+13%", value: Math.ceil(currentBid * 1.13) },
  ];

  const biddingRules = [
    "Bids are binding and cannot be retracted",
    "You will be notified if you are outbid",
    "Winning bidders must complete payment within 48 hours",
    "All sales are final once the auction ends",
  ];

  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    return `${month}/${day}/${year} ${displayHours}:${minutes}:${seconds} ${ampm}`;
  };

  const handlePlaceBid = () => {
    if (termsAccepted && commitmentAccepted && parseFloat(bidAmount) >= minimumBid) {
      console.log("Bid placed:", bidAmount);
      // Handle bid submission
    }
  };

  return (
    <div className="space-y-4">
      {/* Auction Status */}
      <div 
        className="p-4 rounded-lg"
        style={{ backgroundColor: "#E8F0FE" }}
      >
        <div className="flex items-center gap-2 mb-1" style={{ color: "#1447E6" }}>
          <TrendingUp size={20} />
          <h3 className="font-semibold text-lg">Current Auction Status</h3>
        </div>
        <div className="flex justify-between items-center">
          <span style={{ color: "#1447E6" }}>Current Bid:</span>
          <span className="font-bold text-xl" style={{ color: "#1447E6" }}>
            ${currentBid}
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
            Minimum bid: ${minimumBid} (5% greater than current bid)
          </p>
        </div>

        <Input
          type="number"
          placeholder={`$ ${minimumBid}`}
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="text-lg"
        />

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Quick Bid Options:</p>
          <div className="grid grid-cols-4 gap-2">
            {quickBidOptions.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setBidAmount(String(option.value))}
                className="py-2 px-3 rounded border text-center transition-colors hover:bg-gray-200"
                style={{ backgroundColor: "#F5F5F5", borderColor: "#D4D4D4" }}
              >
                <div className="text-xs text-gray-600">{option.label}</div>
                <div className="font-semibold text-sm">${option.value}</div>
              </button>
            ))}
          </div>
        </div>

        <div 
          className="p-3 rounded space-y-2"
          style={{ backgroundColor: "#F5F5F5", borderColor: "#D4D4D4" }}
        >
          <div className="flex items-start gap-2">
            <Info size={18} className="text-gray-600 flex-shrink-0 mt-0.5" />
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
            />
            <label className="text-sm text-gray-700">
              I agree to the <span className="text-primary font-medium">bidding terms and conditions</span>
            </label>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              checked={commitmentAccepted}
              onCheckedChange={(checked) => setCommitmentAccepted(checked === true)}
            />
            <label className="text-sm text-gray-700">
              I understand that placing a bid is a binding commitment to purchase if I win the auction.
            </label>
          </div>
        </div>

        <Button
          className="w-full bg-primary text-white"
          disabled={!termsAccepted || !commitmentAccepted || parseFloat(bidAmount) < minimumBid}
          onClick={handlePlaceBid}
        >
          Place Bid
        </Button>
      </div>

      {/* Bid History */}
      <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900">Bid History</h3>
        
        <div className="space-y-3">
          {product.bitHistory && product.bitHistory.length > 0 ? (
            [...product.bitHistory].reverse().map((bid, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                <div>
                  <div className="font-medium text-gray-900">{bid.name}</div>
                  <div className="text-xs text-gray-600">
                    {formatDateTime(bid.timeStamp)}
                  </div>
                </div>
                <div className="font-semibold" style={{ color: "#1447E6" }}>
                  ${bid.value}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No bids yet. Be the first to bid!</p>
          )}
        </div>
      </div>
    </div>
  );
};