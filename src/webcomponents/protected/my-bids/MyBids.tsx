"use client";

import { useState, useMemo } from "react"; // Adjust path
import { UserAuctionHistoryItemDto, UserBidStatus } from "@/types/auction.type"; // Adjust path
import { MyBidsHistory } from "./MyBidsHistory";
import { BidsHistoryCard } from "./BidsHistoryCard";
import { Pagination } from "@/webcomponents/reusable";
import { useMyAuctionHistory } from "@/api/auction";

type FilterTab = "all" | "winning" | "outbid" | "completed";

const ITEMS_PER_PAGE = 10;

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Bids" },
  { id: "winning", label: "Winning" },
  { id: "outbid", label: "Outbid" },
  { id: "completed", label: "Completed" },
];

// Map tab → userBidStatus filter applied client-side
const TAB_STATUS_MAP: Record<FilterTab, UserBidStatus[] | null> = {
  all: null,
  winning: ["WINNING"],
  outbid: ["OUTBID"],
  completed: ["LOST", "WINNING"],
};

export const MyBids = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Always fetch full list for stats derivation (or add a dedicated stats endpoint later)
  const { data: allData } = useMyAuctionHistory({ page: 1, limit: 10 });

  // Paginated fetch for current tab
  const { data, isLoading, isError } = useMyAuctionHistory({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const allItems: UserAuctionHistoryItemDto[] = allData?.data ?? [];
  const items: UserAuctionHistoryItemDto[] = data?.data ?? [];

  // Client-side filter by tab
  const filteredItems = useMemo(() => {
    const statusFilter = TAB_STATUS_MAP[activeTab];
    if (!statusFilter) return items;
    return items.filter((item) =>
      statusFilter.includes(item.userBidStatus as UserBidStatus),
    );
  }, [activeTab, items]);

  // Derive stats from full list
  const stats = useMemo(
    () => ({
      totalBids: allItems.length,
      winningBids: allItems.filter((i) => i.userBidStatus === "WINNING").length,
      outbidBids: allItems.filter((i) => i.userBidStatus === "OUTBID").length,
      wonBids: allItems.filter((i) => i.userBidStatus === "LOST").length,
    }),
    [allItems],
  );

  const totalPages = data?.meta
    ? Math.ceil(data.meta.total / ITEMS_PER_PAGE)
    : 0;

  const handleTabChange = (tab: FilterTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="py-16 px-4 lg:px-8 flex flex-col gap-6">
      {/* Stats Card */}
      {allItems.length > 0 && <BidsHistoryCard stats={stats} />}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 relative">
          <div
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${
                tabs.findIndex((t) => t.id === activeTab) * 100
              }%)`,
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary bg-primary/5"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-3 text-gray-600">Loading your bids...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-red-600 font-semibold">
            Failed to load bid history
          </p>
          <p className="text-gray-500 text-sm mt-1">Please try again later</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && filteredItems.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 font-semibold">No bids found</p>
          <p className="text-gray-400 text-sm mt-1">
            {activeTab === "all"
              ? "You haven't placed any bids yet"
              : `No ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()} bids`}
          </p>
        </div>
      )}

      {/* Bid List */}
      {!isLoading && !isError && filteredItems.length > 0 && (
        <div className="flex flex-col gap-4">
          {filteredItems.map((item, idx) => (
            <MyBidsHistory key={item.auctionId} bid={item} index={idx} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};
