"use client";

import { MessageThread } from "@/interface/messagethread";
import { useState } from "react";

interface ChatWindowProps {
  thread: MessageThread;
}

export const ChatWindow = ({ thread }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    console.log("Send message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-[90%]">
      {/* Header */}
      <div className="bg-white p-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
          {getInitials(thread.otherPerson)}
        </div>
        <h3 className="text-lg font-semibold">{thread.otherPerson}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {thread.messages.map((message) => {
          const isUser = message.from === "user";
          return (
            <div
              key={message.messageId}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md rounded-lg p-3 ${
                  isUser ? "bg-blue-600 text-white" : "bg-white border"
                }`}
              >
                <p className="text-sm">{message.body}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border-t p-4 flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button className="bg-blue-600 text-white px-6 rounded-lg">Send</button>
      </form>
    </div>
  );
};
