"use client";

import { useState, useMemo } from "react";
import { AdminHeading } from "@/webcomponents/reusable";
import { NotificationData } from "./NotificationData";
import { NotificationDetailsDialog } from "./NotificationDetailsDialog";
import { Bell, AlertCircle, CheckCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
} from "@/api/notification";
import { NotificationResponseDto } from "@/types/notification.type";

type TabType = "all" | "unread" | "read";

export const Notification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationResponseDto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useGetNotificationsQuery();
  const { mutate: markAsRead, isPending: markingAllAsRead } =
    useMarkNotificationAsReadMutation();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsReadMutation();
  const { mutate: deleteNotification } = useDeleteNotificationMutation();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["notifications"] });

  const tabs = [
    { id: "all" as TabType, label: "All" },
    { id: "unread" as TabType, label: "Unread" },
    { id: "read" as TabType, label: "Read" },
  ];

  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.isRead);
      case "read":
        return notifications.filter((n) => n.isRead);
      default:
        return notifications;
    }
  }, [activeTab, notifications]);

  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.filter((n) => n.isRead).length;

  const handleMarkAsRead = (id: string) => {
    markAsRead(id, { onSuccess: invalidate });
  };

  const handleDelete = (id: string) => {
    deleteNotification(id, { onSuccess: invalidate });
  };

  const handleViewDetails = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      setSelectedNotification(notification);
      setIsDialogOpen(true);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead("", { onSuccess: invalidate });
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <AdminHeading
          heading="Notifications"
          subheading="Stay updated with all platform activity"
        />
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={markingAllAsRead || unreadCount === 0}
          >
            <Check size={16} className="mr-2" />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
            <Bell size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
            <p className="text-sm text-gray-600">Total Notifications</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-100">
            <AlertCircle size={24} className="text-orange-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
            <p className="text-sm text-gray-600">Unread</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-100">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">{readCount}</p>
            <p className="text-sm text-gray-600">Read</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const count =
            tab.id === "all"
              ? totalCount
              : tab.id === "unread"
                ? unreadCount
                : readCount;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-400 text-sm">
          Loading notifications...
        </div>
      ) : filteredNotifications.length > 0 ? (
        <NotificationData
          notifications={filteredNotifications}
          onMarkAsRead={handleMarkAsRead}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Notifications
          </h3>
          <p className="text-gray-600">
            You don&apos;t have any {activeTab !== "all" ? activeTab : ""}{" "}
            notifications.
          </p>
        </div>
      )}

      {/* Details Dialog */}
      <NotificationDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedNotification(null);
        }}
        notification={selectedNotification}
      />
    </div>
  );
};
