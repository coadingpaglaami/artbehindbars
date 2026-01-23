"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Message } from "@/interface/message";
import { Mail, Calendar } from "lucide-react";

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: Message | null;
}

export const MessageDialog = ({
  isOpen,
  onClose,
  message,
}: MessageDialogProps) => {
  if (!message) return null;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-175">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {message.subject}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Message from {message.senderName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Sender Info */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
              {message.senderName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span className="font-semibold text-gray-900">
                  {message.senderName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Calendar size={14} />
                <span>{formatDate(message.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div className="bg-gray-50 rounded-lg p-4 min-h-50">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {message.messageBody}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};