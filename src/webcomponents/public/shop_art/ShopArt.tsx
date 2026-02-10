/* eslint-disable react-hooks/purity */
"use client";

import { useGetArtworks } from "@/api/gallary";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isClientAuthenticated } from "@/lib/auth-client";
import { Category } from "@/types/gallery.types";
import { Product, SearchBar } from "@/webcomponents/reusable";
import { useMemo, useState } from "react";


export const ShopArt = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  
  const isAuthenticated = isClientAuthenticated();
  const itemsPerPage = 12;

  // Fetch artworks using TanStack Query
  const {
    data: artworksData,
    isLoading,
    isError,
    error,
  } = useGetArtworks({
    page: currentPage,
    limit: itemsPerPage,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  // Extract unique categories from the fetched artworks
  const categories = useMemo<Category[]>(() => {
    if (!artworksData?.data) return [];
    
    const uniqueCategories = new Set<Category>();
    artworksData.data.forEach((artwork) => {
      uniqueCategories.add(artwork.category);
    });
    
    return Array.from(uniqueCategories);
  }, [artworksData?.data]);

  // Client-side filtering for search and availability
  const filteredProducts = useMemo(() => {
    if (!artworksData?.data) return [];

    return artworksData.data.filter((artwork) => {
      // Search filter (client-side for now)
      const searchMatch =
        search === "" ||
        artwork.title.toLowerCase().includes(search.toLowerCase()) ||
        artwork.artist?.name.toLowerCase().includes(search.toLowerCase());

      // Availability filter (will be used when sold out logic is implemented)
      // const availabilityMatch =
      //   selectedAvailability === "all" ||
      //   (selectedAvailability === "Available" && !artwork.isSoldOut) ||
      //   (selectedAvailability === "Sold" && artwork.isSoldOut);

      // For now, just use search match
      return searchMatch;
    });
  }, [artworksData?.data, search, selectedAvailability]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Category | "all");
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="py-16 flex flex-col gap-6 lg:px-8 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="md:text-4xl text-2xl font-semibold mb-6">Shop Art</h2>
        <span className="text-[#525252]">
          Browse our collection of original prison artwork. All pieces are
          auction-based with &quot;Buy It Now&quot; options.
        </span>
      </div>

      <SearchBar
        placeholder="Search by title or artist name..."
        value={search}
        onChange={setSearch}
      />

      <div className="flex flex-col md:flex-row gap-2.5">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="category">Categories</Label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="availability">Availability</Label>
          <Select
            value={selectedAvailability}
            onValueChange={setSelectedAvailability}
            disabled // Disabled until sold out logic is implemented
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Availability filter will be enabled when sold out logic is implemented
          </p>
        </div>
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
          Error loading artworks: {error?.message || "Something went wrong"}
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && (
        <div className="flex flex-col gap-1.5">
          <span className="text-sm">
            Showing {filteredProducts.length} results
          </span>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((artwork) => (
              <Product
                key={artwork.id}
                product={{
                  productId: artwork.id,
                  productTitle: artwork.title,
                  productArtist: artwork.isAnonymous
                    ? "Anonymous"
                    : artwork.artist?.name || "Unknown Artist",
                  productPrice: artwork.buyItNowPrice,
                  auctionPrice: artwork.startingBidPrice,
                  prouductPhoto: artwork.imageUrl,
                  productCategory: artwork.category,
                  // isSoldOut: artwork.isSoldOut, // Will be uncommented when API supports it
                  isSoldOut: false, // Temporary
                  // remainingTime: new Date(artwork.auctionEndTime), // Will be added when API supports it
                  remainingTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Temporary: 2 days from now
                }}
                buttonText={[
                  isAuthenticated ? "Make a Bid" : "Login to Purchase",
                ]}
              />
            ))}
          </div>

          {/* Pagination */}
          {artworksData && artworksData.meta.totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {artworksData.meta.totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(artworksData.meta.totalPages, prev + 1)
                  )
                }
                disabled={currentPage === artworksData.meta.totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-600">No artworks found</p>
        </div>
      )}
    </div>
  );
};