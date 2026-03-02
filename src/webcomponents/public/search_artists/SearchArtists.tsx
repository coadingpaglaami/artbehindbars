"use client";

import { SearchBar } from "@/webcomponents/reusable";
import { useMemo, useState } from "react";
import { ArtistInformation } from "./ArtistInfo";
import { useGetArtists } from "@/api/gallary";
 // Adjust path as needed

export const SearchArtists = () => {
  const [search, setSearch] = useState("");
  const [page] = useState(1);
  const limit = 100; // Fetch more to enable client-side search

  const { data, isLoading, isError, error } = useGetArtists({
    page,
    limit,
  });

  const filteredArtists = useMemo(() => {
    if (!data?.data) return [];

    return data.data.filter((artist) => {
      const searchLower = search.toLowerCase();
      const nameMatch = artist.name.toLowerCase().includes(searchLower);
      // Note: bio field is not in ArtistResponseDto, remove if not available
      return nameMatch;
    });
  }, [search, data]);

  return (
    <div className="py-16 flex flex-col gap-6 lg:px-8 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="md:text-4xl text-2xl font-semibold">Search Artists</h2>
        <span className="text-[#525252]">
          Discover the talented artists behind our collection and learn their
          stories.
        </span>
      </div>

      <SearchBar
        placeholder="Search by artist name or biography..."
        value={search}
        onChange={setSearch}
      />

      <div className="flex flex-col gap-1.5">
        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading artists...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold">Failed to load artists</p>
            <p className="text-red-600 text-sm mt-1">
              {error instanceof Error ? error.message : "Please try again later"}
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !isError && (
          <>
            <span className="text-sm">
              Showing {filteredArtists.length} results
            </span>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredArtists.length > 0 ? (
                filteredArtists.map((artist) => (
                  <ArtistInformation key={artist.id} artist={artist} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600">
                    No artists found matching &quot;{search}&quot;
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};