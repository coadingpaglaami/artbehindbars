"use client";

import { Notification } from "@/interface/admin";
import {
  Mail,
  Palette,
  Users,
  Settings,
  FileImage,
  Clock,
  Eye,
  Check,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationDataProps {
  notifications: Notification[];
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  onViewDetails: (notificationId: string) => void;
}

export const NotificationData = ({
  notifications,
  onMarkAsRead,
  onDelete,
  onViewDetails,
}: NotificationDataProps) => {
  const getTypeConfig = (type: string) => {
    switch (type) {
      case "New Fan Mail":
      case "Message Forwarded":
        return {
          icon: <Mail size={20} />,
          bgColor: "#DBEAFE",
          textColor: "#1E40AF",
        };
      case "Artwork Uploaded":
      case "Artwork Sold":
        return {
          icon: <FileImage size={20} />,
          bgColor: "#E0E7FF",
          textColor: "#4F46E5",
        };
      case "New Bid Placed":
      case "Auction Ending Soon":
        return {
          icon: <Palette size={20} />,
          bgColor: "#FED7AA",
          textColor: "#C2410C",
        };
      case "New Member Registration":
        return {
          icon: <Users size={20} />,
          bgColor: "#D1FAE5",
          textColor: "#065F46",
        };
      case "System Update":
        return {
          icon: <Settings size={20} />,
          bgColor: "#F3F4F6",
          textColor: "#4B5563",
        };
      default:
        return {
          icon: <Mail size={20} />,
          bgColor: "#F3F4F6",
          textColor: "#4B5563",
        };
    }
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const typeConfig = getTypeConfig(notification.type);
        const isUnread = notification.status === "Unread";

        return (
          <div
            key={notification.notificationId}
            className={`rounded-lg shadow-md p-6 flex justify-between gap-6 ${
              isUnread ? "bg-[#EFF6FF]" : "bg-white"
            }`}
          >
            {/* Left Side */}
            <div className="flex items-start gap-4 flex-1">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: typeConfig.bgColor,
                  color: typeConfig.textColor,
                }}
              >
                {typeConfig.icon}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {notification.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600">{notification.description}</p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(notification.notificationId)}
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 px-3"
                  >
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  {isUnread && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.notificationId)}
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
                {isUnread && (
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                )}
                <Clock size={14} />
                <span>{notification.timestamp}</span>
              </div>

              {/* Delete Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(notification.notificationId)}
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