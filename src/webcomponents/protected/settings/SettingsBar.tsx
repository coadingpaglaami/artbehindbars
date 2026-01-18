"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  CreditCard,
  Image as ImageIcon,
  Lock,
  LogOut,
} from "lucide-react";

export const SettingsBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Edit Profile", href: "/edit_profile", icon: User },
    { label: "Billing Info", href: "/billing_info", icon: CreditCard },
    { label: "Art Gallery", href: "/art_gallery", icon: ImageIcon },
    { label: "Security", href: "/security", icon: Lock },
  ];

  return (
    <div className="w-full max-w-[320px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <nav className="flex flex-col py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 transition-colors relative ${
                isActive
                  ? "bg-[#FAF7F2] text-[#C5A073]"
                  : "text-[#4A4A4A] hover:bg-gray-50"
              }`}
            >
              {/* Left Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.25 bg-[#C5A073]" />
              )}

              <item.icon size={24} strokeWidth={1.5} />
              <span className="text-lg font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Logout Button (Styled separately as per design) */}
        <button
          onClick={() => console.log("Logging out...")}
          className="flex items-center gap-4 px-6 py-6 text-red-600 hover:bg-red-50 transition-colors mt-2"
        >
          <LogOut size={24} strokeWidth={2} />
          <span className="text-lg font-semibold">Logout</span>
        </button>
      </nav>
    </div>
  );
};
