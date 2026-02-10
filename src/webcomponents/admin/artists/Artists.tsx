"use client";

import { Button } from "@/components/ui/button";
import { AdminHeading } from "@/webcomponents/reusable/AdminHeading";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ArtistTable } from "./ArtistTable";
import { ArtistDialogue } from "./ArtistDialogue";
import { Pagination } from "@/webcomponents/reusable";
import { useGetArtists, useDeleteArtistMutation } from "@/api/gallary";
import { toast } from "sonner";

export const Artists = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const itemsPerPage = 10;

  // Fetch artists using TanStack Query with object destructuring
  const {
    data: artistsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetArtists({
    page: currentPage,
    limit: itemsPerPage,
  });

  // Delete mutation with object destructuring
  const { mutate: deleteArtist, isPending: isDeleting } =
    useDeleteArtistMutation();

  const handleDelete = (artistId: string) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      deleteArtist(artistId, {
        onSuccess: () => {
          toast.success("Artist deleted successfully");
          refetch();
        },
        onError: (error) => {
          toast.error(`Failed to delete artist: ${error.message}`);
        },
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSuccess = () => {
    refetch();
  };

  const totalPages = artistsData?.meta?.totalPages || 1;
  const artists = artistsData?.data || [];

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
            setCurrentPage(1);
          }}
          className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
        />
        <p className="text-xs text-gray-500 mt-2">
          Search functionality will be integrated later
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          Error loading artists: {error?.message || "Something went wrong"}
        </div>
      )}

      {/* Artists Table */}
      {!isLoading && !isError && (
        <>
          {artists.length > 0 ? (
            <>
              <ArtistTable
                artists={artists}
                onDelete={handleDelete}
                onEditSuccess={handleSuccess}
              />

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
              <p className="text-gray-600">No artists found</p>
            </div>
          )}
        </>
      )}

      {/* Add Artist Dialog */}
      <ArtistDialogue
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        mode="add"
        onSuccess={handleSuccess}
      />
    </div>
  );
};
