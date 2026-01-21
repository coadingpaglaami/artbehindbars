"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Palette,
  Gavel,
  Mail,
  UserCircle,
  MessageSquare,
  ShieldCheck,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";

// 1. Define the Navigation Structure
const NAVIGATION_GROUPS = [
  {
    title: "Dashboard",
    items: [{ label: "Overview", href: "/admin/overview", icon: LayoutGrid }],
  },
  {
    title: "Content & Artists",
    items: [
      { label: "Artists", href: "/admin/artists", icon: Users },
      { label: "Artwork", href: "/admin/artwork", icon: Palette },
      { label: "Auctions", href: "/admin/auctions", icon: Gavel },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Fan Mail", href: "/admin/fan_mail", icon: Mail },
      { label: "Members", href: "/admin/members", icon: UserCircle },
      {
        label: "CONNECT Forum",
        href: "/admin/connect_forum",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Access Control",
        href: "/admin/access_control",
        icon: ShieldCheck,
      },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col w-full bg-[#F8FAFC] border-r border-slate-200 h-full overflow-y-auto ">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100 bg-white">
        <div className="relative w-10 h-10  rounded-xl flex items-center justify-center">
          {/* Mock Logo */}
          <Image
            src="/navbar/logo.svg"
            alt="Logo"
            className="w-6 h-6 object-contain"
            fill
          />
        </div>
        <h1 className="text-xl font-bold text-slate-800">
          Artbehindbar{" "}
          <span className="text-[#C5A073] font-semibold">Admin</span>
        </h1>
      </div>

      {/* Navigation Area */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        {NAVIGATION_GROUPS.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {group.title}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-[#E0EFFF] text-blue-600"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    <item.icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer / Profile Section */}
      <div className="p-4 border-t border-slate-200 bg-white mt-auto">
        <div className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            {/* FIXED: Parent container needs w-11 h-11 for 'fill' to work */}
            <div className="relative w-11 h-11">
              <Image
                src="/artist/artist1.jpg" // Use a real image path or avatar
                alt="Profile"
                className="rounded-full object-cover border border-slate-200"
                fill
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 leading-tight">
                Alex Morgan
              </span>
              <span className="text-xs text-slate-500">alex@nexus.com</span>
            </div>
          </div>

          <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
