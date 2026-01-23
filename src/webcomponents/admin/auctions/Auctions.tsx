"use client";

import { useState, useMemo } from "react";
import { generateAuctionArtworkData } from "@/data/admin/auctionData";
import { AuctionArtwork } from "@/interface/admin";
import { AdminHeading } from "@/webcomponents/reusable";
import { AuctionTable } from "./AuctionTable";
import { Pagination } from "@/webcomponents/reusable";

type TabType = "all" | "live" | "scheduled" | "completed";

export const Auctions = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const auctionData: AuctionArtwork[] = generateAuctionArtworkData(100);

  const tabs = [
    { id: "all" as TabType, label: "All Auctions" },
    { id: "live" as TabType, label: "Live Now" },
    { id: "scheduled" as TabType, label: "Scheduled" },
    { id: "completed" as TabType, label: "Completed" },
  ];

  // Filter auctions based on active tab
  const filteredAuctions = useMemo(() => {
    switch (activeTab) {
      case "all":
        return auctionData;
      case "live":
        return auctionData.filter((auction) => auction.status === "Active");
      case "scheduled":
        return auctionData.filter((auction) => auction.status === "Not Started");
      case "completed":
        return auctionData.filter((auction) => auction.status === "Ended");
      default:
        return auctionData;
    }
  }, [activeTab, auctionData]);

  // Pagination
  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuctions = filteredAuctions.slice(startIndex, endIndex);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

      {/* Auction Table */}
      <AuctionTable auctions={currentAuctions} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};