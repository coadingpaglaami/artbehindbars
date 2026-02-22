import { NotificationResponseDto } from "@/types/notification.type";
import { Bell, Heart, MessageCircle, CreditCard, Info, ShieldAlert } from "lucide-react";

const iconMap: Record<NotificationResponseDto["type"], React.ReactNode> = {
  PAYMENT: <CreditCard className="w-4 h-4 text-emerald-500" />,
  LIKE: <Heart className="w-4 h-4 text-rose-500" />,
  COMMENT: <MessageCircle className="w-4 h-4 text-blue-500" />,
  ADMIN: <ShieldAlert className="w-4 h-4 text-orange-500" />,
  INFO: <Info className="w-4 h-4 text-slate-400" />,
};

const bgMap: Record<NotificationResponseDto["type"], string> = {
  PAYMENT: "bg-emerald-50",
  LIKE: "bg-rose-50",
  COMMENT: "bg-blue-50",
  ADMIN: "bg-orange-50",
  INFO: "bg-slate-50",
};

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export const NotificationItem = ({
  notification,
}: {
  notification: NotificationResponseDto;
}) => {
  const isUnread = !notification.isRead;

  return (
    <div
      className={`flex gap-3 p-3 hover:bg-slate-50 transition-colors cursor-pointer border-b last:border-b-0 ${
        isUnread ? "bg-blue-50/30" : ""
      }`}
    >
      {/* Icon */}
      <div className={`shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center ${bgMap[notification.type]}`}>
        {iconMap[notification.type]}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div
            className={`text-sm leading-tight truncate ${
              isUnread ? "font-semibold text-slate-900" : "font-normal text-slate-700"
            }`}
          >
            {notification.title}
          </div>
          {isUnread && (
            <div className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-blue-500" />
          )}
        </div>
        <div className="text-sm text-slate-500 mt-0.5 leading-snug line-clamp-2">
          {notification.message}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {formatRelativeTime(notification.createdAt)}
        </div>
      </div>
    </div>
  );
};