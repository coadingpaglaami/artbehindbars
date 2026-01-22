"use client";

import { useState, useMemo } from "react";
import { AdminHeading } from "@/webcomponents/reusable";
import { generatedNotificationn } from "../ui";
import { NotificationData } from "./NotificationData";
import { NotificationDetailsDialog } from "./NotificationDetailsDialog";
import { Bell, AlertCircle, CheckCircle, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type TabType = "all" | "unread" | "read";

export const Notification = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const notifications = generatedNotificationn;

  const tabs = [
    { id: "all" as TabType, label: "All" },
    { id: "unread" as TabType, label: "Unread" },
    { id: "read" as TabType, label: "Read" },
  ];

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "all":
        return notifications;
      case "unread":
        return notifications.filter((n) => n.status === "Unread");
      case "read":
        return notifications.filter((n) => n.status === "Read");
      default:
        return notifications;
    }
  }, [activeTab, notifications]);

  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => n.status === "Unread").length;
  const readCount = notifications.filter((n) => n.status === "Read").length;

  const [selectedNotification, setSelectedNotification] = useState<
    (typeof notifications)[0] | null
  >(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMarkAsRead = (notificationId: string) => {
    console.log("Mark as read:", notificationId);
  };

  const handleDelete = (notificationId: string) => {
    console.log("Delete:", notificationId);
  };

  const handleViewDetails = (notificationId: string) => {
    const notification = notifications.find(
      (n) => n.notificationId === notificationId,
    );
    if (notification) {
      setSelectedNotification(notification);
      setIsDialogOpen(true);
    }
  };

  const handleMarkAllAsRead = () => {
    console.log("Mark all as read");
  };

  const handleClearAll = () => {
    console.log("Clear all");
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-start">
        <AdminHeading
          heading="Notifications"
          subheading="Stay updated with all platform activity"
        />
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check size={16} className="mr-2" />
            Mark All as Read
          </Button>
          <Button variant="outline" onClick={handleClearAll}>
            <Trash2 size={16} className="mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Notification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
            <Bell size={24} className="text-blue-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
            <p className="text-sm text-gray-600">Total Notifications</p>
          </div>
        </div>

        {/* Unread Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-orange-100">
            <AlertCircle size={24} className="text-orange-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">{unreadCount}</p>
            <p className="text-sm text-gray-600">Unread</p>
          </div>
        </div>

        {/* Read Notifications */}
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

      {/* Tab Section */}
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

      {/* Notification List */}
      <NotificationData
        notifications={filteredNotifications}
        onMarkAsRead={handleMarkAsRead}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
      />

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
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

      {/* Notification Details Dialog */}
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
