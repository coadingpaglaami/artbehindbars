"use client";
import { FanMailSheet } from "./FanMailSheet";
import { FanMailTable } from "./FanMailTable";
import { Tabs } from "./Tabs";
import { useState } from "react";
import { Pagination } from "@/webcomponents/reusable";
import {
  useArchiveFanMailMutation,
  useGetAdminFanMails,
  useReplyFanMailMutation,
} from "@/api/gallary";
import { Loader2 } from "lucide-react";
import {
  FanMailItem,
  FanMailQueryDto,
  FormattedFanMail,
} from "@/types/fanmail.type";
import { getErrorMessage } from "@/lib/utils";

export const FanMail = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [selectedMessage, setSelectedMessage] =
    useState<FormattedFanMail | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  // Map tab to API params with proper typing
  const getStatusParam = (): Partial<FanMailQueryDto> => {
    switch (activeTab) {
      case "Inbox":
        return { status: "PENDING" };
      case "Forwarded":
        return { status: "REPLIED" };
      case "Archived":
        return { isArchived: true };
      default:
        return { status: "PENDING" };
    }
  };

  const {
    data: adminFanMailsData,
    isLoading: isLoadingAdminFanMails,
    refetch,
  } = useGetAdminFanMails({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    ...getStatusParam(),
  });

  const { mutate: archiveFanMail, isPending: isArchiving } =
    useArchiveFanMailMutation();
  const { mutate: replyFanMail, isPending: isReplying } =
    useReplyFanMailMutation();

  const tabs = ["Inbox", "Forwarded", "Archived"];

  // Format API data with proper typing
  const formatMessages = (): FormattedFanMail[] => {
    if (!adminFanMailsData?.data) return [];

    return adminFanMailsData.data.map((item: FanMailItem) => ({
      messageId: item.id,
      from: `${item.sender.firstName} ${item.sender.lastName}`,
      to: item.artist.name,
      subject: item.subject || "No Subject",
      body: item.message,
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      status: item.status === "PENDING" ? "Unread" : "Replied",
      isArchived: item.isArchived,
      senderId: item.sender.id,
      artistId: item.artist.id,
      originalMessage: item, // Optional: keep original data
    }));
  };

  const handleMessageClick = (message: FormattedFanMail) => {
    setSelectedMessage(message);
    setSheetOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleArchive = (messageId: string) => {
    archiveFanMail(messageId, {
      onSuccess: () => {
        refetch();
        setSheetOpen(false);
      },
      onError: (error) => {
        const message = getErrorMessage(error);
        console.error("Archive error:", message);
      }
    });
  };

  const handleReply = (messageId: string, replyMessage: string) => {
    replyFanMail(
      { id: messageId, payload: { message: replyMessage } },
      {
        onSuccess: () => {
          refetch();
          setSheetOpen(false);
        },
        onError: (error) => {
          const message = getErrorMessage(error);
          console.error("Reply error:", message);
        }
      }
    );
  };

  const totalPages = Math.ceil(
    (adminFanMailsData?.meta?.total || 0) / ITEMS_PER_PAGE,
  );
  const currentMessages = formatMessages();

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Fan Mail</h1>
        <p className="text-sm text-gray-600 mt-1">
          Review and forward messages from the community to artists.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Table */}
      {isLoadingAdminFanMails ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          <FanMailTable
            messages={currentMessages}
            onMessageClick={handleMessageClick}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Sheet */}
      <FanMailSheet
        message={selectedMessage}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onArchive={handleArchive}
        onReply={handleReply}
        isArchiving={isArchiving}
        isReplying={isReplying}
      />
    </div>
  );
};
