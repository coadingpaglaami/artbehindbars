"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CreditCard,
  Heart,
  MessageCircle,
  ShieldAlert,
  Info,
  Clock,
  User,
  MapPin,
  Calendar,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMyProfile } from "@/api/account";
import { NotificationResponseDto } from "@/types/notification.type";

interface NotificationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  notification: NotificationResponseDto | null;
}

const getTypeConfig = (type: NotificationResponseDto["type"]) => {
  switch (type) {
    case "PAYMENT":
      return { icon: <CreditCard size={24} />, bgColor: "#D1FAE5", textColor: "#065F46" };
    case "LIKE":
      return { icon: <Heart size={24} />, bgColor: "#FFE4E6", textColor: "#BE123C" };
    case "COMMENT":
      return { icon: <MessageCircle size={24} />, bgColor: "#DBEAFE", textColor: "#1E40AF" };
    case "ADMIN":
      return { icon: <ShieldAlert size={24} />, bgColor: "#FED7AA", textColor: "#C2410C" };
    case "INFO":
    default:
      return { icon: <Info size={24} />, bgColor: "#F3F4F6", textColor: "#4B5563" };
  }
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const NotificationDetailsDialog = ({
  isOpen,
  onClose,
  notification,
}: NotificationDetailsDialogProps) => {
  const { data: myProfile } = useGetMyProfile();

  if (!notification) return null;

  const typeConfig = getTypeConfig(notification.type);
  const isUnread = !notification.isRead;

  const initials = myProfile
    ? `${myProfile.firstName?.[0] ?? ""}${myProfile.lastName?.[0] ?? ""}`
    : "AU";

  const fullName = myProfile
    ? `${myProfile.firstName ?? ""} ${myProfile.lastName ?? ""}`.trim()
    : "Admin User";

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
              style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.textColor }}
            >
              {typeConfig.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{notification.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isUnread
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {isUnread ? "Unread" : "Read"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <Clock size={14} />
                <span>{formatDate(notification.createdAt)}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{notification.message}</p>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Admin Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Administrator Information
            </h4>
            <div className="rounded-lg p-4 space-y-3 bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg font-semibold">{initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{fullName}</p>
                  <p className="text-sm text-gray-600">System Administrator</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                {myProfile?.email && (
                  <div className="flex items-start gap-2">
                    <Mail size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{myProfile.email}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <User size={16} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm text-gray-900">Platform Management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Type Badge + Close */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Notification Type</p>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.textColor }}
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