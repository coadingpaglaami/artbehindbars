// lib/socketNotificationHandler.ts

import { toast } from "sonner";
import { NotificationResponseDto } from "@/types/notification.type";

export function handleSocketNotification(
  newNotification: NotificationResponseDto,
  queryClient: unknown,
) {
  // Invalidate notifications
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (queryClient as any).invalidateQueries({ queryKey: ["notifications"] });

  const toastMessage = {
    PAYMENT: { icon: "💰", description: "Payment update" },
    LIKE: { icon: "❤️", description: "New like" },
    COMMENT: { icon: "💬", description: "New comment" },
    ADMIN: { icon: "⚠️", description: "Admin message" },
    INFO: { icon: "ℹ️", description: "Information" },
    CONNECTION_REQUEST: { icon: "🤝", description: "Connection request" },
    CONNECTION_ACCEPTED: { icon: "✅", description: "Connection accepted" },
    WARNING: { icon: "⚠️", description: "Warning" },
  };

  const typeInfo = toastMessage[newNotification.type] || {
    icon: "🔔",
    description: "Notification",
  };

  toast.success(`${typeInfo.icon} ${newNotification.message}`, {
    description: newNotification.title || typeInfo.description,
  });

  // Browser notification
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "granted") {
      new Notification(newNotification.title, {
        body: newNotification.message,
        icon: "/favicon.ico",
      });
    }
  }
}
