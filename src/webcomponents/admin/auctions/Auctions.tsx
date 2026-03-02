"use client";

import { useState } from "react";
import { AdminHeading } from "@/webcomponents/reusable";
import { AuctionTable } from "./AuctionTable";
import { Pagination } from "@/webcomponents/reusable";
import { AuctionStatus } from "@/types/auction.type"; // Adjust path
import { useGetAllAuctions } from "@/api/auction";

type TabType = "all" | "live" | "scheduled" | "completed";

// Map tab → API status param
const TAB_STATUS_MAP: Record<TabType, AuctionStatus | undefined> = {
  all: undefined,
  live: "Ongoing",
  scheduled: "Upcoming",
  completed: "Ended",
};

const ITEMS_PER_PAGE = 10;

const tabs = [
  { id: "all" as TabType, label: "All Auctions" },
  { id: "live" as TabType, label: "Live Now" },
  { id: "scheduled" as TabType, label: "Scheduled" },
  { id: "completed" as TabType, label: "Completed" },
];

export const Auctions = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetAllAuctions({

    page: currentPage,
    limit: ITEMS_PER_PAGE,
    status: TAB_STATUS_MAP[activeTab],
  });

  const auctions = data?.data ?? [];
  const totalPages = data?.meta
    ? Math.ceil(data.meta.total / ITEMS_PER_PAGE)
    : 0;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page on tab change
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Auctions"
        subheading="Manage all auctions from this panel"
      />

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 relative">
          {/* Active Tab Indicator */}
          <div
            className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${
                tabs.findIndex((tab) => tab.id === activeTab) * 100
              }%)`,
            }}
          />
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  style={{ marginBottom: "-1px" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
          <p className="mt-3 text-gray-600">Loading auctions...</p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-red-600 font-semibold">Failed to load auctions</p>
          <p className="text-gray-500 text-sm mt-1">Please try again later</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && auctions.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 font-semibold">No auctions found</p>
          <p className="text-gray-400 text-sm mt-1">
            {activeTab === "all"
              ? "No auctions have been created yet"
              : `No ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()} at the moment`}
          </p>
        </div>
      )}

      {/* Auction Table */}
      {!isLoading && !isError && auctions.length > 0 && (
        <AuctionTable
          auctions={auctions}
          // Pass refetch key so table can invalidate on extend
          queryParams={{ page: currentPage, limit: ITEMS_PER_PAGE, status: TAB_STATUS_MAP[activeTab] }}
        />
      )}

      {/* Pagination — server-driven */}
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