"use client";
import {
  User,
  Menu,
  Gavel,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  UserCogIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { isClientAuthenticated } from "@/lib/auth-client"; // Add getClientUserId
import { NotificationBell } from "./NotificationBell";

export const NavBar = () => {
  const activeLink = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const isAuthenticated = isClientAuthenticated();
  console.log(isAuthenticated);

  const navLinks: { label: string; link: string }[] = [
    { label: "Home", link: "/" },
    { label: "Shop Art", link: "/shop_art" },
    { label: "Search Artists", link: "/artists" },
    { label: "Connect", link: "/community" },
    { label: "Our Story", link: "/our_story" },
    { label: "FAQ", link: "/faq" },
    { label: "Contact Us", link: "/contact_us" },
    isAuthenticated && { label: "My Bids", link: "/my-bids" },
  ].filter(Boolean) as { label: string; link: string }[];

  const navItems = [
    {
      name: "My Bids",
      icon: Gavel,
      link: "/my-bids",
    },
    {
      name: "My Connections",
      icon: Users,
      link: "/my-connection",
    },
    {
      name: "Messages",
      icon: MessageSquare,
      link: "/messages",
    },
    {
      name: "Settings",
      icon: Settings,
      link: "/edit_profile",
    },
    {
      name: "Admin Panel",
      icon: UserCogIcon,
      link: "/admin/overview",
    },
    {
      name: "Logout",
      icon: LogOut,
      link: "/login",
    },
  ];

  return (
    <div className=" h-full lg:px-6 px-4 max-w-360 mx-auto w-full">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/navbar/logo.svg"
            alt="The Art of Reform Logo"
            width={32}
            height={32}
          />
          <span className="text-white text-xl">The Art of Reform</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.link}
              className="relative text-white text-lg group"
            >
              {link.label}
              {/* Active border */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                  activeLink === link.link ? "w-full" : "w-0"
                }`}
              />
              {/* Hover border animation */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                  activeLink === link.link ? "w-0" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Login Button, Notification Bell, and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell - Only show when authenticated and userId exists */}
          {isAuthenticated && <NotificationBell />}

          {isAuthenticated ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="bg-[#FFFFFF4D] p-1.5 rounded-md flex items-center gap-2.5 cursor-pointer text-white">
                  <User size={20} /> <span>Account</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-3 last:border-t-2 last:border-gray-300">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </PopoverContent>
            </Popover>
          ) : (
            <button
              className="bg-white p-1.5 rounded-md flex items-center text-primary gap-2.5 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              <span>Login</span>
              <User size={20} />
            </button>
          )}
          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden text-white">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary border-none ">
              <nav className="flex flex-col space-y-6 mt-8 mx-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.link}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="relative text-white text-lg"
                  >
                    {link.label}
                    {activeLink === link.label && (
                      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white" />
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};
