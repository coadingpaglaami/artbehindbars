import { Bell } from "lucide-react";

export const Navbar = () => {
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
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={24} strokeWidth={1.5} />

          {/* Red Notification Badge */}
          <span className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[10px] font-bold text-white border-2 border-white">
            3
          </span>
        </button>

        {/* Vertical Divider */}
        <div className="h-10 w-[1.5px] bg-slate-100" />

        {/* User Information */}
        <div className="flex flex-col text-right">
          <span className="text-[15px] font-bold text-slate-800 leading-tight">
            Alex Morgan
          </span>
          <span className="text-[13px] text-slate-400 font-medium">
            Administrator
          </span>
        </div>
      </div>
    </header>
  );
};
