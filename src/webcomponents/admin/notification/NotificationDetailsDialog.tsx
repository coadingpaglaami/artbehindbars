"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Notification } from "@/interface/admin";
import {
  Mail,
  Palette,
  Users,
  Settings,
  FileImage,
  Clock,
  User,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notification: Notification | null;
}

export const NotificationDetailsDialog = ({
  isOpen,
  onClose,
  notification,
}: NotificationDetailsDialogProps) => {
  if (!notification) return null;

  const getTypeConfig = (type: string) => {
    switch (type) {
      case "New Fan Mail":
      case "Message Forwarded":
        return {
          icon: <Mail size={24} />,
          bgColor: "#DBEAFE",
          textColor: "#1E40AF",
        };
      case "Artwork Uploaded":
      case "Artwork Sold":
        return {
          icon: <FileImage size={24} />,
          bgColor: "#E0E7FF",
          textColor: "#4F46E5",
        };
      case "New Bid Placed":
      case "Auction Ending Soon":
        return {
          icon: <Palette size={24} />,
          bgColor: "#FED7AA",
          textColor: "#C2410C",
        };
      case "New Member Registration":
        return {
          icon: <Users size={24} />,
          bgColor: "#D1FAE5",
          textColor: "#065F46",
        };
      case "System Update":
        return {
          icon: <Settings size={24} />,
          bgColor: "#F3F4F6",
          textColor: "#4B5563",
        };
      default:
        return {
          icon: <Mail size={24} />,
          bgColor: "#F3F4F6",
          textColor: "#4B5563",
        };
    }
  };

  const typeConfig = getTypeConfig(notification.type);

  // Mock admin/user information
  const adminInfo = {
    name: "Admin User",
    email: "admin@artbehindbars.com",
    role: "System Administrator",
    department: "Platform Management",
    location: "New York, USA",
    joinedDate: "January 2024",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-semibold">
            Notification Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Notification Info */}
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: typeConfig.bgColor,
                color: typeConfig.textColor,
              }}
            >
              {typeConfig.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {notification.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    notification.status === "Unread"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {notification.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock size={14} />
                <span>{notification.timestamp}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {notification.description}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Admin Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Administrator Information
            </h4>
            <div
              className="rounded-lg p-4 space-y-3"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              {/* Name and Role */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-semibold">
                    {adminInfo.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{adminInfo.name}</p>
                  <p className="text-sm text-gray-600">{adminInfo.role}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                <div className="flex items-start gap-2">
                  <Mail size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900">{adminInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <User size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm text-gray-900">{adminInfo.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-sm text-gray-900">{adminInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Joined</p>
                    <p className="text-sm text-gray-900">{adminInfo.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Type Badge */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Notification Type</p>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{
                  backgroundColor: typeConfig.bgColor,
                  color: typeConfig.textColor,
                }}
              >
                {notification.type}
              </span>
            </div>
            <Button onClick={onClose} className="bg-primary text-white">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};