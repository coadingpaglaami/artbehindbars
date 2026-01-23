'use client';
import { ProductProps } from "@/interface/product";
import { getClientAuthStatus } from "@/lib/auth";
import Image from "next/image";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";


export interface ProductCardProps {
  product: ProductProps;
  buttonText: string[];
}

export const Product = ({ product, buttonText }: ProductCardProps) => {
  const isAuthenticated = getClientAuthStatus();
  const router = useRouter();

  // Calculate remaining time
  const getRemainingTime = () => {
    if (!product.remainingTime) return "Auction ended";

    const now = new Date();
    const remaining = product.remainingTime.getTime() - now.getTime();

    if (remaining <= 0) return "Auction ended";

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
      {/* Sold Out Overlay */}
      {product.isSoldOut && (
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
          src={product.prouductPhoto}
          alt={product.productTitle}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col p-4 space-y-3">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900">
          {product.productTitle}
        </h3>

        {/* Artist Name */}
        <p className="text-gray-600">by {product.productArtist}</p>

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Price Information - Full details when NOT sold out */}
        {!product.isSoldOut && (
          <div className="space-y-2">
            {/* Buy It Now */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Buy It Now</span>
              <span className="text-[#008236] font-semibold">
                ${product.productPrice}
              </span>
            </div>

            {/* Current Bid */}
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Current Bid</span>
              <span className="text-[#1447E6] font-semibold">
                ${product.auctionPrice}
              </span>
            </div>
          </div>
        )}

        {/* Show only Buy It Now price for sold out items */}
        {product.isSoldOut && (
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Price</span>
            <span className="text-[#008236] font-semibold">
              ${product.productPrice}
            </span>
          </div>
        )}

        {/* Remaining Time - Hide for sold out */}
        {!product.isSoldOut && (
          <div className="flex items-center gap-2 text-[#F54900]">
            <Clock size={18} />
            <span className="font-medium">{getRemainingTime()}</span>
          </div>
        )}

        {/* Action Buttons - Hide for sold out */}
        {!product.isSoldOut && (
          <div className="flex gap-2 pt-2">
            {isAuthenticated ? (
              <>
                <button
                  className="flex-1 py-2.5 px-4 rounded-md font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#155DFC" }}
                  onClick={() => router.push(`/product/${product.productId}`)}
                >
                  {buttonText[0] || "Make a Bid"}
                </button>
                <button
                  className="flex-1 py-2.5 px-4 rounded-md font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#00A63E" }}
                >
                  {buttonText[1] || "Buy Now"}
                </button>
              </>
            ) : (
              <button
                className="w-full py-2.5 px-4 rounded-md font-semibold text-gray-700 transition-colors"
                style={{ backgroundColor: "#D4D4D4" }}
              >
                {buttonText[0] || "Login to Bid"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
