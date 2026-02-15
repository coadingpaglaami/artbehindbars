"use client";

import { Bell } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getSocket } from "@/lib/socket"; // Adjust path as needed
import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useDeleteNotificationMutation,
} from "@/api/notification"; // Adjust path as needed
import { useQueryClient } from "@tanstack/react-query";
import { NotificationResponseDto } from "@/types/notification.type";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  type: "PAYMENT" | "LIKE" | "COMMENT" | "ADMIN" | "INFO";
}

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch notifications using TanStack Query
  const { data: notifications = [], isLoading } = useGetNotificationsQuery();

  // Mutations
  const markAsReadMutation = useMarkNotificationAsReadMutation();
  const deleteNotificationMutation = useDeleteNotificationMutation();

  // Close popover when pathname changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Setup Socket.IO for real-time notifications
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    // Listen for new notifications
    socket.on("notification", (newNotification: Notification) => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success(newNotification.message, {
        description: newNotification.title,
      });

      // Optional: Show browser notification
      if (Notification && Notification.permission === "granted") {
        new Notification(newNotification.title, {
          body: newNotification.message,
          icon: "/favicon.ico",
        });
      }

      // Optional: Play sound
      // const audio = new Audio('/notification-sound.mp3');
      // audio.play().catch(() => {});
    });

    return () => {
      socket.off("notification");
    };
  }, [queryClient]);

  // Request browser notification permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await markAsReadMutation.mutateAsync(notificationId);
      // Invalidate to refresh the list
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification: NotificationResponseDto) => {
    markAsRead(notification.id);

    const urlMatch = notification.message.match(/https?:\/\/[^\s]+/);

    if (urlMatch) {
      const url = urlMatch[0];

      try {
        const parsedUrl = new URL(url);

        // Internal order page
        if (parsedUrl.pathname.startsWith("/order/")) {
          router.push(parsedUrl.pathname);
          setOpen(false);
          return;
        }

        // Any other absolute URL → open in new tab
        window.open(url, "_blank");
        return;
      } catch {
        // If URL parsing fails, fallback to opening in new tab
        window.open(url, "_blank");
        return;
      }
    }

    // Handle LIKE / COMMENT navigation
    if (notification.type === "LIKE" || notification.type === "COMMENT") {
      const artworkIdMatch = notification.message.match(/artwork\/([\w-]+)/);
      const postIdMatch = notification.message.match(/post\/([\w-]+)/);

      if (artworkIdMatch) {
        router.push(`/artwork/${artworkIdMatch[1]}`);
        setOpen(false);
        return;
      }

      if (postIdMatch) {
        router.push(`/post/${postIdMatch[1]}`);
        setOpen(false);
        return;
      }
    }

    // INFO / ADMIN → just mark as read (no navigation)
  };

  // Delete notification
  const handleDelete = async (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation(); // Prevent click on notification
    try {
      await deleteNotificationMutation.mutateAsync(notificationId);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "PAYMENT":
        return "💰";
      case "LIKE":
        return "❤️";
      case "COMMENT":
        return "💬";
      case "ADMIN":
        return "⚠️";
      case "INFO":
        return "ℹ️";
      default:
        return "🔔";
    }
  };

  // Format time ago
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative text-white hover:opacity-80 transition-opacity">
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 sm:w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <span className="text-sm text-gray-500">{unreadCount} unread</span>
          )}
        </div>

        <div className="max-h-100 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 border-b hover:bg-gray-50 transition-colors relative group",
                  !notification.isRead && "bg-blue-50 hover:bg-blue-100",
                )}
              >
                <div
                  onClick={() => handleNotificationClick(notification)}
                  className="cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="text-2xl shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-sm">
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {getTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete button - shows on hover */}
                <button
                  onClick={(e) => handleDelete(e, notification.id)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                  title="Delete notification"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
