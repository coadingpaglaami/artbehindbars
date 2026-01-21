"use client";
import { FanMailInterface } from "@/interface/admin";
import { FanMailSheet } from "./FanMailSheet";
import { FanMailTable } from "./FanMailTable";
import { Tabs } from "./Tabs";
import { useState } from "react";
import { generateMessageData } from "@/data/admin";
import { Pagination } from "@/webcomponents/reusable";

export const FanMail = () => {
  const fanMailData: FanMailInterface[] = generateMessageData(88);
  const [activeTab, setActiveTab] = useState("Inbox");
  const [selectedMessage, setSelectedMessage] =
    useState<FanMailInterface | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const tabs = ["Inbox", "Forwarded", "Archived"];

  // Calculate pagination
  const totalPages = Math.ceil(fanMailData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMessages = fanMailData.slice(startIndex, endIndex);

  const handleMessageClick = (message: FanMailInterface) => {
    setSelectedMessage(message);
    setSheetOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Fan Mail</h1>
        <p className="text-sm text-gray-600 mt-1">
          Review and forward messages from the community to artists.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Table */}
      <FanMailTable
        messages={currentMessages}
        onMessageClick={handleMessageClick}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Sheet */}
      <FanMailSheet
        message={selectedMessage}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
};
