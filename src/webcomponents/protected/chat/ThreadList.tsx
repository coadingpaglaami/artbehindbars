"use client";

import { MessageThread } from "@/interface/messagethread";
import { useRouter, useParams } from "next/navigation";

interface ThreadListProps {
  threads: MessageThread[];
}

export const ThreadList = ({ threads }: ThreadListProps) => {
  const router = useRouter();
  const params = useParams<{ chatId?: string }>();

  const selectedChatId = params?.chatId;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getLastMessage = (messages: MessageThread["messages"]) => {
    const last = messages[messages.length - 1];
    if (!last) return "";
    return last.body.length > 40 ? last.body.slice(0, 40) + "..." : last.body;
  };

  return (
    <div className="w-80 bg-white border-r overflow-y-auto">
      {threads.map((thread) => {
        const hasUnread = thread.messages.some((m) => m.status === "Unread");

        const isActive = selectedChatId === thread.threadId;

        return (
          <div
            key={thread.threadId}
            onClick={() => router.push(`/chat/${thread.threadId}`)}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
              isActive ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                {getInitials(thread.otherPerson)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3
                    className={`font-semibold truncate ${
                      hasUnread ? "text-blue-600" : ""
                    }`}
                  >
                    {thread.otherPerson}
                  </h3>
                  {hasUnread && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </div>

                <p className="text-sm text-gray-600 truncate mt-1">
                  {getLastMessage(thread.messages)}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
