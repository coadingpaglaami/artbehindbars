"use client";

import {
  CreditCard,
  Heart,
  MessageCircle,
  ShieldAlert,
  Info,
  Clock,
  Eye,
  Check,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationResponseDto } from "@/types/notification.type";

interface NotificationDataProps {
  notifications: NotificationResponseDto[];
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  onViewDetails: (notificationId: string) => void;
}

const getTypeConfig = (type: NotificationResponseDto["type"]) => {
  switch (type) {
    case "PAYMENT":
      return { icon: <CreditCard size={20} />, bgColor: "#D1FAE5", textColor: "#065F46" };
    case "LIKE":
      return { icon: <Heart size={20} />, bgColor: "#FFE4E6", textColor: "#BE123C" };
    case "COMMENT":
      return { icon: <MessageCircle size={20} />, bgColor: "#DBEAFE", textColor: "#1E40AF" };
    case "ADMIN":
      return { icon: <ShieldAlert size={20} />, bgColor: "#FED7AA", textColor: "#C2410C" };
    case "INFO":
    default:
      return { icon: <Info size={20} />, bgColor: "#F3F4F6", textColor: "#4B5563" };
  }
};

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export const NotificationData = ({
  notifications,
  onMarkAsRead,
  onDelete,
  onViewDetails,
}: NotificationDataProps) => {
  return (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const typeConfig = getTypeConfig(notification.type);
        const isUnread = !notification.isRead;

        return (
          <div
            key={notification.id}
            className={`rounded-lg shadow-md p-6 flex justify-between gap-6 ${
              isUnread ? "bg-[#EFF6FF]" : "bg-white"
            }`}
          >
            {/* Left Side */}
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.textColor }}
              >
                {typeConfig.icon}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(notification.id)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 px-3"
                  >
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  {isUnread && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                      className="text-gray-600 hover:text-gray-700 hover:bg-gray-100 px-3"
                    >
                      <Check size={16} className="mr-2" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col items-end justify-between">
              {/* Timestamp */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {isUnread && <div className="w-2 h-2 rounded-full bg-blue-600" />}
                <Clock size={14} />
                <span>{formatRelativeTime(notification.createdAt)}</span>
              </div>

              {/* Delete Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(notification.id)}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};