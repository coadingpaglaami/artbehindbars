"use client";

import { products } from "@/lib/data";
import { ProductLeft } from "./ProductLeft";
import { BidOption } from "./BidOption";
import { BuyOption } from "./BuyOption";
import { useState } from "react";

export const ProductInformation = ({ productId }: { productId: string }) => {
  const [mode, setMode] = useState<"bid" | "buy">("bid");

  const productInformation = products.find(
    (product) => product.productId === productId,
  );

  if (!productInformation) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-svh mx-auto text-center">
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

  return (
    <div className="py-16 px-4">
      <div className="max-w-svh mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Product Card */}
          <div className="lg:w-1/3">
            <ProductLeft
              product={productInformation}
              onModeChange={setMode}
              mode={mode}
            />
          </div>

          {/* Right Side - Bid or Buy Options */}
          <div className="lg:w-2/3">
            {mode === "bid" ? (
              <BidOption product={productInformation} />
            ) : (
              <BuyOption product={productInformation} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
