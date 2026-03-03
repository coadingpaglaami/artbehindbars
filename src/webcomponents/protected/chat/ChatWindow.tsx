"use client";

import { useEffect, useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";
import { ClientSub } from "@/lib/auth-client";
import {
  useGetMessagesQuery,
  useMarkChatSeenMutation,
  useSendMessageMutation,
} from "@/api/chat";
import { Message } from "@/types/chat.type";
import { getErrorMessage } from "@/lib/utils";

interface ChatWindowProps {
  chatId: string;
}

export const ChatWindow = ({ chatId }: ChatWindowProps) => {
  console.log(chatId, "line 19 ChatWindow.tsx");
  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], refetch } = useGetMessagesQuery(chatId);
  const sendMessage = useSendMessageMutation();
  const markSeen = useMarkChatSeenMutation();
  const userId = ClientSub(); // Assuming token contains user ID in 'sub' claim


  useEffect(() => {
    if (!chatId) return;

    markSeen.mutate(chatId);
  }, [chatId]);

  /* =========================
     AUTO SCROLL
  ==========================*/
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* =========================
     SEND MESSAGE
  ==========================*/
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempId = crypto.randomUUID();
    const optimisticMessage = {
      id: tempId,
      chatId,
      content: newMessage,
      createdAt: new Date().toISOString(),
    };

    // optimistic UI
    queryClient.setQueryData(["getMessages", chatId], (old: Message[] = []) => [
      ...old,
      optimisticMessage,
    ]);

    try {
      await sendMessage.mutateAsync(
        {
          chatId,
          content: newMessage,
        },
        {
          onSuccess: () => {
            refetch();
          },
          onError: (error: unknown) => {
            const message = getErrorMessage(error);
            console.error("Failed to send message:", message);
          }
        },
      );
    } catch (err) {
      // rollback if needed
      queryClient.invalidateQueries({ queryKey: ["getMessages", chatId] });
    }

    setNewMessage("");
  };

  /* =========================
     UI
  ==========================*/
  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-[90%]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={`flex ${message.senderId === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                  message.senderId === userId
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-800"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70 float-end">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border-t p-4 flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          disabled={sendMessage.isPending}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
};
