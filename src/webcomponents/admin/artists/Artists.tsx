"use client";

import { Button } from "@/components/ui/button";
import { generateArtistData } from "@/data/admin";
import { AdminHeading } from "@/webcomponents/reusable/AdminHeading";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { ArtistTable } from "./ArtistTable";
import { ArtistDialogue } from "./ArtistDialogue";
import { Pagination } from "@/webcomponents/reusable";
import { ArtistInfo } from "@/interface/admin";

export const Artists = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const allArtists = generateArtistData(70);

  // Filter artists based on search
  const filteredArtists = useMemo(() => {
    if (!search.trim()) return allArtists;

    return allArtists.filter(
      (artist) =>
        artist.artistName.toLowerCase().includes(search.toLowerCase()) ||
        artist.artistIdNumber.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, allArtists]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArtists.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtists = filteredArtists.slice(startIndex, endIndex);

  const handleEdit = (artist: ArtistInfo) => {
    console.log("Edit artist:", artist);
  };

  const handleDelete = (artistId: string) => {
    console.log("Delete artist:", artistId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <AdminHeading
          heading="Artist Management"
          subheading="Manage all artists here"
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Artist
        </Button>
      </div>

      <div className="relative group">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
        />
      </div>

      <ArtistTable
        artists={currentArtists}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Add Artist Dialog */}
      <ArtistDialogue
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode="add"
      />
    </div>
  );
};
