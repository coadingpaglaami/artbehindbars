"use client";

import { Button } from "@/components/ui/button";
import { Lock, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

interface UnauthenticatedViewProps {
  mode: "bid" | "buy";
}

export const UnauthenticatedView = ({ mode }: UnauthenticatedViewProps) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#F5F5F5", border: "2px solid #D4D4D4" }}
        >
          <Lock size={40} className="text-gray-400" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "bid"
              ? "Login to Place Your Bid"
              : "Login to Purchase"}
          </h2>
          <p className="text-gray-600 max-w-md">
            {mode === "bid"
              ? "You need to be logged in to participate in auctions and place bids on artworks."
              : "You need to be logged in to purchase artworks directly."}
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <Button
            onClick={() => router.push("/login")}
            className="w-full text-white font-semibold flex items-center justify-center gap-2"
            style={{
              backgroundColor: mode === "bid" ? "#1447E6" : "#008236",
            }}
          >
            <LogIn size={20} />
            Login to Continue
          </Button>

          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-primary font-medium hover:underline"
            >
              Sign up here
            </button>
          </p>
        </div>

        <div
          className="w-full p-4 rounded-lg space-y-2"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          <h3 className="font-semibold text-gray-900">
            {mode === "bid" ? "Why Create an Account?" : "Benefits of Signing Up"}
          </h3>
          <ul className="text-sm text-gray-700 space-y-1 text-left">
            {mode === "bid" ? (
              <>
                <li>• Participate in live auctions</li>
                <li>• Track your bids in real-time</li>
                <li>• Receive notifications when outbid</li>
                <li>• Access your bidding history</li>
              </>
            ) : (
              <>
                <li>• Secure and fast checkout</li>
                <li>• Save shipping information</li>
                <li>• Track your orders</li>
                <li>• Access exclusive artworks</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};