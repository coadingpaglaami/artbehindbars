// MessageDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FanMail } from "@/types/gallery.types";
import { Mail, Calendar, MessageCircle } from "lucide-react";

interface MessageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: FanMail | null;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REPLIED":
        return "bg-green-100 text-green-800";
      case "CLOSED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Pending Reply";
      case "REPLIED":
        return "Replied";
      case "CLOSED":
        return "Closed";
      default:
        return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-175">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {message.subject || "Fan Mail"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Message from {message.artist.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Sender Info */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
              {message.artist.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-500" />
                <span className="font-semibold text-gray-900">
                  {message.artist.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Calendar size={14} />
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-gray-500" />
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}
            >
              {getStatusText(message.status)}
            </span>
          </div>

          {/* Message Body */}
          <div className="bg-gray-50 rounded-lg p-4 min-h-50">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
