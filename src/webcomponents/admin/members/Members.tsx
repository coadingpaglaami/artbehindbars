"use client";
import { AdminHeading } from "@/webcomponents/reusable";
import { useState, useMemo } from "react";
import { MemberTable } from "./MemberTable";
import { Pagination } from "@/webcomponents/reusable";
import { generateMemberData } from "@/data/admin/memberData";

export const Members = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allMembers = generateMemberData(100);

  // Filter members based on search
  const filteredMembers = useMemo(() => {
    if (!search.trim()) return allMembers;

    return allMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.memberId.toLowerCase().includes(search.toLowerCase()) ||
        member.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, allMembers]);

  // Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, endIndex);

  const handleSuspend = (memberId: string) => {
    console.log("Suspend member:", memberId);
    // Implement suspend logic
  };

  const handleBan = (memberId: string) => {
    console.log("Ban member:", memberId);
    // Implement ban logic
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Member Directory"
        subheading="Manage user accounts and moderation."
      />

      <div className="relative group">
        <input
          type="text"
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
        />
      </div>

      <MemberTable
        members={currentMembers}
        onSuspend={handleSuspend}
        onBan={handleBan}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
