"use client";
import { generateNotificationData } from "@/data/admin";
import { Notification } from "@/interface/admin";
import { Bell, Earth, LogOut, User } from "lucide-react";
import { useState } from "react";
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

export const generatedNotificationn = generateNotificationData(40);
// Get unread notifications

export const Navbar = () => {
  const [notificationData] = useState<Notification[]>(generatedNotificationn);
  const { push } = useRouter();

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
    {
      type: "separator",
    },
    {
      label: "Logout",
      icon: LogOut,
      className: "text-red-600 focus:text-red-600",
      href: "/admin/login",
    },
  ];

  const unreadNotifications = notificationData.filter(
    (n) => n.status === "Unread",
  );
  const unreadCount = unreadNotifications.length;

  // Get first 10 notifications to display
  const displayNotifications = notificationData.slice(0, 10);

  const handleViewAll = () => {
    push("/admin/notification");
    console.log("View all notifications clicked");
    // Navigate to notifications page or open modal
  };

  return (
    <header className="flex items-center justify-between w-full h-20 px-8 bg-white border-b border-slate-100 sticky top-0 z-30">
      {/* 1. Search Bar Section */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <input
            type="text"
            placeholder="Search artists, artwork, members..."
            className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
          />
          {/* Optional: Add search icon if needed, though not in your image */}
          {/* <Search className="absolute right-4 top-3 text-slate-400" size={20} /> */}
        </div>
      </div>

      {/* 2. Actions & Profile Section */}
      <div className="flex items-center gap-8">
        {/* Notification Bell */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={24} strokeWidth={1.5} />

              {/* Red Notification Badge */}
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white border-2 border-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-100 p-0" align="center" sideOffset={8}>
            {/* Header */}
            <div className="flex flex-col px-4 py-3 border-b">
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="flex min-w-6 h-6  text-gray-400">
                  {unreadCount} Unread
                </span>
              )}
            </div>

            {/* Notification List - Scrollable */}
            <div className="max-h-100 overflow-y-auto">
              {displayNotifications.length > 0 ? (
                displayNotifications.map((notification) => (
                  <NotificationItem
                    key={notification.notificationId}
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

        {/* User Information */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col text-right outline-none">
              <span className="text-[15px] font-bold text-slate-800 leading-tight">
                Alex Morgan
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

              return (
                <DropdownMenuItem
                  key={item.label}
                  className={item.className}
                  asChild
                >
                  <Link
                    href={item.href || "#"}
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
