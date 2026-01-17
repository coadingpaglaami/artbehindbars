'use client';
import { myBidsData } from "@/data/mybidsdata";
import { MyBidsHistory } from "./MyBidsHistory";
import { BidsHistoryCard } from "./BidsHistoryCard";

export const MyBids = () => {
  const activeBids = myBidsData.activeBids.filter((bid) => !bid.isCompleted);
  const completedBids = myBidsData.activeBids.filter((bid) => bid.isCompleted);

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h2 className="md:text-4xl text-2xl font-semibold">My Bids</h2>
          <span className="text-[#525252]">
            Track your active bids and view your bidding history.
          </span>
        </div>

        {/* Bid Statistics */}
        <BidsHistoryCard stats={myBidsData.bidStats} />

        {/* Active Bids Section */}
        {activeBids.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Active Bids ({activeBids.length})
            </h3>
            <div className="space-y-4">
              {activeBids.map((bid, idx) => (
                <MyBidsHistory key={idx} bid={bid} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Bids Section */}
        {completedBids.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-gray-900">
              Completed Bids ({completedBids.length})
            </h3>
            <div className="space-y-4">
              {completedBids.map((bid, idx) => (
                <MyBidsHistory key={idx} bid={bid} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {activeBids.length === 0 && completedBids.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Bids Yet
            </h3>
            <p className="text-gray-600">
              Start bidding on artworks to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
