// Message.tsx
"use client";

import { HeadingTwo } from "@/webcomponents/reusable";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageDialog } from "./MessageDialog";
import { useGetMyFanMails, useMarkFanMailAsReadMutation } from "@/api/gallary";
import { Loader2 } from "lucide-react";
import { FanMail } from "@/types/gallery.types";

export const Message = () => {
  const { push } = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<FanMail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: response,
    isLoading,
    error,
    refetch,
  } = useGetMyFanMails({ page: 1, limit: 10 });
  const { mutate: markAsRead } = useMarkFanMailAsReadMutation();

  const messages = response?.data || [];
  const unreadCount = response?.unreadCount || 0;

  const handleMessageClick = async (message: FanMail) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);

    // Mark as read when opened
    if (!message.isReadBySender) {
      markAsRead(message.id, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getStatusBadge = (status: string, isRead: boolean) => {
    if (status === "PENDING") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Not Replied
        </span>
      );
    }

    if (status === "REPLIED") {
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isRead ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
          }`}
        >
          {isRead ? "Replied (Read)" : "Replied (Unread)"}
        </span>
      );
    }

    if (status === "CLOSED") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Closed
        </span>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <>
        <button
          onClick={() => push("/artists")}
          className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="py-16 px-4 flex justify-center items-center min-h-100">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-gray-500">Loading messages...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <button
          onClick={() => push("/artists")}
          className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <div className="py-16 px-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-center">
              Failed to load messages. Please try again.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => push("/artists")}
        className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="py-16 px-4">
        <div className="space-y-6">
          <HeadingTwo
            title="Messages"
            description="Connect with other members of the community"
          />

          {/* Inbox Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Inbox Header */}
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900">
                Inbox ({unreadCount} unread)
              </h3>
            </div>

            {/* Messages List */}
            <div className="divide-y divide-gray-200">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      !message.isReadBySender
                        ? "border-l-4 border-blue-500"
                        : ""
                    }`}
                    style={{
                      backgroundColor: !message.isReadBySender
                        ? "#EFF6FF"
                        : "white",
                    }}
                  >
                    <div className="flex gap-4">
                      {/* Sender Avatar */}
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                          {message.artist.name.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        {/* Sender Name and Timestamp */}
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <h4
                              className={`text-xl ${
                                !message.isReadBySender
                                  ? "font-bold"
                                  : "font-semibold"
                              } text-gray-900 truncate`}
                            >
                              {message.artist.name}
                            </h4>
                            {getStatusBadge(
                              message.status,
                              !message.isReadBySender,
                            )}
                          </div>
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            {formatTimestamp(message.createdAt)}
                          </span>
                        </div>

                        {/* Subject */}
                        {message.subject && (
                          <h5
                            className={`text-lg ${
                              !message.isReadBySender
                                ? "font-bold"
                                : "font-medium"
                            } text-gray-800 mb-1 truncate`}
                          >
                            {message.subject}
                          </h5>
                        )}

                        {/* Message Body Preview */}
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Messages
                  </h3>
                  <p className="text-gray-600">
                    You don&apos;t have any messages yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      <MessageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message={selectedMessage}
      />
    </>
  );
};
