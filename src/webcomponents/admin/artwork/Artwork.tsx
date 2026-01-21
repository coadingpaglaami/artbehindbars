"use client";

import { Button } from "@/components/ui/button";
import { generateArtworkData } from "@/data/admin";
import { AdminHeading } from "@/webcomponents/reusable";
import { Plus, LayoutGrid, TableProperties } from "lucide-react";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArtWorkTableView } from "./ArtWorkTableView";
import { ArtWorkImageView } from "./ArtWorkImageView";
import { ArtWorkDialogue } from "./ArtWorkDialogue";
import { Pagination } from "@/webcomponents/reusable";
import { Artwork as ArtworkInterface } from "@/interface/admin";

export const Artwork = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArtist, setSelectedArtist] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const artworkData: ArtworkInterface[] = generateArtworkData(70);
  const itemsPerPage = viewMode === "grid" ? 9 : 10;

  // Get unique artists
  const uniqueArtists = useMemo(() => {
    const artists = new Set(artworkData.map((art) => art.artist));
    return Array.from(artists).sort();
  }, [artworkData]);

  // Filter artworks
  const filteredArtworks = useMemo(() => {
    let filtered = artworkData;

    // Filter by search
    if (search.trim()) {
      filtered = filtered.filter(
        (art) =>
          art.artworkTitle.toLowerCase().includes(search.toLowerCase()) ||
          art.artworkId.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter by artist
    if (selectedArtist !== "all") {
      filtered = filtered.filter((art) => art.artist === selectedArtist);
    }

    return filtered;
  }, [search, selectedArtist, artworkData]);

  // Pagination
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, endIndex);

  const handleEdit = (artwork: ArtworkInterface) => {
    console.log("Edit artwork:", artwork);
  };

  const handleDelete = (artworkId: string) => {
    console.log("Delete artwork:", artworkId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <AdminHeading
          heading="Artwork Management"
          subheading="Manage all artworks here"
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Upload Artwork
        </Button>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3.5 flex-1">
          {/* Search */}
          <div className="relative group flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by title or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Artist Filter */}
          <Select
            value={selectedArtist}
            onValueChange={(value) => {
              setSelectedArtist(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-50 h-12 bg-[#F8FAFC] border-[#E2E8F0]">
              <SelectValue placeholder="All Artists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Artists</SelectItem>
              {uniqueArtists.map((artist) => (
                <SelectItem key={artist} value={artist}>
                  {artist}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg"
          style={{ backgroundColor: "#F8FAFC" }}
        >
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded transition-colors ${
              viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white/50"
            }`}
            title="Grid View"
          >
            <LayoutGrid
              size={20}
              className={
                viewMode === "grid" ? "text-blue-600" : "text-gray-600"
              }
            />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2.5 rounded transition-colors ${
              viewMode === "table" ? "bg-white shadow-sm" : "hover:bg-white/50"
            }`}
            title="Table View"
          >
            <TableProperties
              size={20}
              className={
                viewMode === "table" ? "text-blue-600" : "text-gray-600"
              }
            />
          </button>
        </div>
      </div>

      {/* Content View */}
      {viewMode === "table" ? (
        <ArtWorkTableView
          artworks={currentArtworks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <ArtWorkImageView
          artworks={currentArtworks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Add Artwork Dialog */}
      <ArtWorkDialogue
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode="add"
        allArtists={uniqueArtists}
      />
    </div>
  );
};
