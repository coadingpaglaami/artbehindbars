"use client";

import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useGetUserChats } from "@/api/chat";

// Response interface based on actual API response
export interface ChatListItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  otherUser: {
    id: string;
    firstName: string;
    lastName: string;
  };
  unreadCount: number;
}

export const ThreadList = () => {
  const router = useRouter();
  const params = useParams<{ chatId?: string }>();

  const selectedChatId = params?.chatId;

  // Fetch chats
  const { data: chats, isLoading, error } = useGetUserChats();

  const getInitials = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) return "?";
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const getFullName = (firstName: string, lastName: string) => {
    if (!firstName && !lastName) return "Unknown User";
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  const getLastMessage = (chat: ChatListItem) => {
    if (!chat.lastMessage) return "No messages yet";
    return chat.lastMessage.content.length > 40
      ? chat.lastMessage.content.slice(0, 40) + "..."
      : chat.lastMessage.content;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="md:w-80 w-16 bg-white border-r flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="md:w-80 w-16 bg-white border-r flex items-center justify-center p-4">
        <p className="text-red-500 text-sm text-center">Failed to load chats</p>
      </div>
    );
  }

  if (!chats || chats.unreadCount === 0) {
    return (
      <div className="md:w-80 w-16 bg-white border-r flex items-center justify-center p-4">
        <p className="text-gray-500 text-sm text-center">
          No conversations yet
        </p>
      </div>
    );
  }

  return (
    <div className="md:w-80 w-16 bg-white border-r overflow-y-auto">
      {chats.map((chat) => {
        const hasUnread = chat.unreadCount > 0;
        const isActive = selectedChatId === chat.id;
        const fullName = getFullName(
          chat.otherUser.firstName,
          chat.otherUser.lastName,
        );

        return (
          <div
            key={chat.id}
            onClick={() => router.push(`/chat/${chat.id}`)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
              isActive ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="md:w-12 w-10 h-10 md:h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold max-md:p-2 shrink-0">
                {getInitials(chat.otherUser.firstName, chat.otherUser.lastName)}
              </div>

              {/* Content - Hidden on mobile, shown on md */}
              <div className="hidden md:block flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3
                    className={`font-semibold truncate ${
                      hasUnread ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {fullName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {chat.lastMessage && (
                      <span className="text-xs text-gray-400">
                        {formatTime(chat.lastMessage.createdAt)}
                      </span>
                    )}
                    {hasUnread && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </div>

                <p
                  className={`text-sm truncate mt-1 ${
                    hasUnread ? "text-gray-900 font-medium" : "text-gray-500"
                  }`}
                >
                  {getLastMessage(chat)}
                </p>
              </div>

              {/* Mobile view - just avatar and unread dot */}
              <div className="md:hidden relative">
                {hasUnread && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
