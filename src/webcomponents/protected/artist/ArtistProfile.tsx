"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArtistInfo } from "./ArtistInfo";
import { ArtWorkGallery } from "./ArtWorkGallery";
import { useGetArtistArtwork, useGetArtistById } from "@/api/gallary";
import { ArtistResponseDto, ArtworkResponseDto, PaginatedResponseDto } from "@/types/gallery.types";


export const ArtistProfile = ({ artistId }: { artistId: string }) => {
  const { push } = useRouter();
  const {data,isLoading} =useGetArtistById(artistId)
  const { data:artwork, isError } = useGetArtistArtwork(artistId, {
    page: 1,
    limit: 100,
  });



  // Loading State
  if (isLoading) {
    return (
      <div className="py-16 px-4">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading artist profile...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError || !data) {
    return (
      <div className="py-16 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Artist not found
          </h2>
          <p className="text-gray-600 mt-2">
            The artist you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <button
            onClick={() => push("/artists")}
            className="mt-4 text-primary hover:underline"
          >
            Back to Search Artist
          </button>
        </div>
      </div>
    );
  }

  const artist = data;


  return (
    <div className="px-4">
      <div className="">
        <button
          onClick={() => push("/artists")}
          className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Search Artist
        </button>

        <div className="py-16 flex flex-col gap-12">
          {/* Artist Info Section */}
          <ArtistInfo artist={data as ArtistResponseDto } artworkCount={artwork?.meta.total} />

          {/* Artwork Gallery Section */}
          <ArtWorkGallery artist={artist as ArtistResponseDto} artworks={artwork as unknown as PaginatedResponseDto<ArtworkResponseDto>} />
        </div>
      </div>
    </div>
  );
};