"use client";
import {
  User,
  Menu,
  Gavel,
  Users,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getClientAuthStatus } from "@/lib/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = getClientAuthStatus();
  console.log(isAuthenticated);

  const navLinks = [
    "Home",
    "Shop Art",
    "Search Artists",
    "Connect",
    "Our Story",
    "FAQ",
    "Contact Us",
  ];

  const navItems = [
    {
      name: "My Bids",
      icon: Gavel,
      link: "/my-bids",
    },
    {
      name: "My Connections",
      icon: Users,
      link: "/my-connections",
    },
    {
      name: "Messages",
      icon: MessageSquare,
      link: "/messages",
    },
    {
      name: "Settings",
      icon: Settings,
      link: "/settings",
    },
    {
      name: "Logout",
      icon: LogOut,
      link: "/logout",
    },
  ];

  return (
    <div className=" h-full lg:px-6 px-4 ">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/navbar/logo.svg"
            alt="ArtBehindBars Logo"
            width={32}
            height={32}
          />
          <span className="text-white text-xl">ArtBehindBars</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link}
              href="#"
              onClick={() => setActiveLink(link)}
              className="relative text-white text-lg group"
            >
              {link}
              {/* Active border */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                  activeLink === link ? "w-full" : "w-0"
                }`}
              />
              {/* Hover border animation */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 bg-white transition-all duration-300 ${
                  activeLink === link ? "w-0" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Login Button and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-[#FFFFFF4D] p-1.5 rounded-md flex items-center cursor-pointer text-white">
                  <User size={20} /> <span className="mr-2">Account</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-3 last:border-t-2 last:border-gray-300">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md"
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </PopoverContent>
            </Popover>
          ) : (
            <button className="bg-white p-1.5 rounded-md flex items-center text-primary cursor-pointer">
              <span className="mr-2">Login</span>
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
                    key={link}
                    href="#"
                    onClick={() => {
                      setActiveLink(link);
                      setIsOpen(false);
                    }}
                    className="relative text-white text-lg"
                  >
                    {link}
                    {activeLink === link && (
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
