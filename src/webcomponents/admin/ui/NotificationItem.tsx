import { Notification } from "@/interface/admin";

export const NotificationItem = ({
  notification,
}: {
  notification: Notification;
}) => {
  const isUnread = notification.status === "Unread";

  return (
    <div
      className={`flex gap-3 p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-b-0 ${
        isUnread ? "bg-blue-50/30" : ""
      }`}
    >
      {/* Unread Dot Indicator */}
      {isUnread && (
        <div className="shrink-0 mt-1.5">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
        </div>
      )}

      {/* Notification Content */}
      <div className={`flex-1 ${!isUnread ? "ml-5" : ""}`}>
        <div
          className={`text-sm ${isUnread ? "font-semibold" : "font-normal"} text-slate-900 leading-tight`}
        >
          {notification.title}
        </div>
        <div className="text-sm text-slate-600 mt-1 leading-tight">
          {notification.description}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {notification.timestamp}
        </div>
      </div>
    </div>
  );
};
