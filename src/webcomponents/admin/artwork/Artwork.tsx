"use client";

import { Button } from "@/components/ui/button";
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
import {
  useGetArtworks,
  useGetArtists,
  useDeleteArtworkMutation,
} from "@/api/gallary";
import { Category } from "@/types/gallery.types";
import { toast } from "sonner";

export const Artwork = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all",
  );
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const itemsPerPage = viewMode === "grid" ? 9 : 10;

  // Fetch artworks with object destructuring
  const {
    data: artworksData,
    isLoading: isLoadingArtworks,
    isError: isArtworksError,
    error: artworksError,
    refetch: refetchArtworks,
  } = useGetArtworks({
    page: currentPage,
    limit: itemsPerPage,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  // Fetch artists for filter with object destructuring
  const { data: artistsData } = useGetArtists({
    page: 1,
    limit: 100,
  });

  // Delete mutation with object destructuring
  const { mutate: deleteArtwork, isPending: isDeleting } =
    useDeleteArtworkMutation();

  const handleDelete = (artworkId: string) => {
    deleteArtwork(artworkId, {
      onSuccess: () => {
        toast.success("Artwork deleted successfully");
        refetchArtworks();
      },
      onError: (error) => {
        toast.error(`Failed to delete artwork: ${error.message}`);
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSuccess = () => {
    refetchArtworks();
  };

  const artworks = artworksData?.data || [];
  const totalPages = artworksData?.meta?.totalPages || 1;

  // Get unique artists from fetched data
  const uniqueArtists = useMemo(() => {
    if (!artistsData?.data) return [];
    return artistsData.data.map((artist) => artist.name);
  }, [artistsData]);

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
              placeholder="Search by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onValueChange={(value: Category | "all") => {
              setSelectedCategory(value);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-50 h-12 bg-[#F8FAFC] border-[#E2E8F0]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Religious">Religious</SelectItem>
              <SelectItem value="Non_Religious">Non Religious</SelectItem>
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

      {/* Loading State */}
      {isLoadingArtworks && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {isArtworksError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error loading artworks:{" "}
          {artworksError?.message || "Something went wrong"}
        </div>
      )}

      {/* Content View */}
      {!isLoadingArtworks && !isArtworksError && (
        <>
          {artworks.length > 0 ? (
            <>
              {viewMode === "table" ? (
                <ArtWorkTableView
                  artworks={artworks}
                  onDelete={handleDelete}
                  onEditSuccess={handleSuccess}
                  allArtists={uniqueArtists}
                />
              ) : (
                <ArtWorkImageView
                  artworks={artworks}
                  onDelete={handleDelete}
                  onEditSuccess={handleSuccess}
                  allArtists={uniqueArtists}
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
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">No artworks found</p>
            </div>
          )}
        </>
      )}

      {/* Add Artwork Dialog */}
      <ArtWorkDialogue
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode="add"
        allArtists={uniqueArtists}
        onSuccess={handleSuccess}
      />
    </div>
  );
};
