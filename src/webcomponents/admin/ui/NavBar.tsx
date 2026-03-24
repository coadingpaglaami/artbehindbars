"use client";

import { Bell, Earth, LogOut, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationItem } from "./NotificationItem";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useGetNotificationsQuery } from "@/api/notification";
import { useGetMyProfile } from "@/api/account";
import { NotificationResponseDto } from "@/types/notification.type";
// import { useLogout } from "@/api/auth";

export const Navbar = () => {
  const { data: notificationsData, isLoading: notificationsLoading } =
    useGetNotificationsQuery();
  const { data: myProfileData } = useGetMyProfile();
  const { push } = useRouter();

  // Use real API data; fall back to empty array while loading
  const notifications: NotificationResponseDto[] = notificationsData ?? [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const displayNotifications = notifications.slice(0, 10);
  // const { mutate: logoutMutate } = useLogout();

  const handleLogout =async () => {
    // logoutMutate
    
    // clearTokens();
    push("/admin/login");
  };

  const handleViewAll = () => {
    push("/admin/notification");
  };

  const profileDropdownItems = [
    {
      label: "Main Website",
      icon: Earth,
      href: "/",
    },
    {
      label: "Profile",
      icon: User,
      href: "/admin/profile",
    },
    {
      label: "Notifications",
      icon: Bell,
      href: "/admin/notification",
    },
    { type: "separator" as const },
    {
      label: "Logout",
      icon: LogOut,
      className: "text-red-600 focus:text-red-600",
      onClick: handleLogout,
    },
  ];

  return (
    <header className="flex items-center justify-end w-full h-20 px-8 bg-white border-b border-slate-100 sticky top-0 z-30">
      <div className="flex items-center gap-8">
        {/* Notification Bell */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={24} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white border-2 border-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="center" sideOffset={8}>
            {/* Header */}
            <div className="flex flex-col px-4 py-3 border-b">
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-sm text-gray-400">{unreadCount} Unread</span>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-96 overflow-y-auto">
              {notificationsLoading ? (
                <div className="p-8 text-center text-slate-400 text-sm">
                  Loading...
                </div>
              ) : displayNotifications.length > 0 ? (
                displayNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-slate-500">
                  No notifications
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-2">
              <Button
                variant="ghost"
                className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                onClick={handleViewAll}
              >
                View all notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Vertical Divider */}
        <div className="h-10 w-[1.5px] bg-slate-100" />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col text-right outline-none">
              <span className="text-[15px] font-bold text-slate-800 leading-tight">
                {myProfileData?.firstName} {myProfileData?.lastName}
              </span>
              <span className="text-[13px] text-slate-400 font-medium">
                Administrator
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            {profileDropdownItems.map((item, index) => {
              if (item.type === "separator") {
                return <DropdownMenuSeparator key={index} />;
              }

              const Icon = item.icon;

              // Logout item — uses onClick instead of href
              if (item.label === "Logout") {
                return (
                  <DropdownMenuItem
                    key={item.label}
                    className={item.className}
                    onClick={handleLogout}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {Icon && <Icon className="h-4 w-4" />}
                      {item.label}
                    </div>
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuItem
                  key={item.label}
                  className={item.className}
                  asChild
                >
                  <Link
                    href={(item).href || "#"}
                    className="flex items-center gap-2 w-full"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};