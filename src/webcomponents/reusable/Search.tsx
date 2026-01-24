"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
  className,
}: SearchBarProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center rounded-md shadow-md p-3.5",
        className
      )}
    >
      {/* Search Icon */}
      <Search className="absolute left-5 h-4 w-4 text-muted-foreground" />

      {/* Input */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          pl-9
          bg-transparent
          border border-[#D4D4D4]
          focus-visible:ring-0
          focus-visible:ring-offset-0
          placeholder:text-muted-foreground
        "
      />
    </div>
  );
};
