"use client";

import { messagesdata } from "@/data/messagedata";
import { HeadingTwo } from "@/webcomponents/reusable";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MessageDialog } from "./MessageDialog";
import { Message as MessageType } from "@/interface/message";

export const Message = () => {
  const { push } = useRouter();
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const unreadCount = messagesdata.filter((msg) => !msg.isRead).length;

  const handleMessageClick = (message: MessageType) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
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

  return (
    <>
      <button
        onClick={() => push("/artists")}
        className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="py-16 px-4">
        <div className="max-w-max mx-auto space-y-6">
          <HeadingTwo
            title="Messages"
            description="Connect with other members of the community"
          />

          {/* Inbox Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Inbox Header */}
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900">
                Inbox ({unreadCount})
              </h3>
            </div>

            {/* Messages List */}
            <div className="divide-y divide-gray-200">
              {messagesdata.length > 0 ? (
                messagesdata.map((message, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleMessageClick(message)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      !message.isRead
                        ? "border border-[#E5E5E5]"
                        : ""
                    }`}
                    style={{
                      backgroundColor: !message.isRead ? "#EFF6FF" : "white",
                    }}
                  >
                    <div className="flex gap-4">
                      {/* Sender Avatar */}
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
                          {message.senderName.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        {/* Sender Name and Timestamp */}
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h4
                            className={`text-xl ${
                              !message.isRead ? "font-bold" : "font-semibold"
                            } text-gray-900 truncate`}
                          >
                            {message.senderName}
                          </h4>
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>

                        {/* Subject */}
                        <h5
                          className={`text-lg ${
                            !message.isRead ? "font-bold" : "font-medium"
                          } text-gray-800 mb-1 truncate`}
                        >
                          {message.subject}
                        </h5>

                        {/* Message Body Preview */}
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {message.messageBody}
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