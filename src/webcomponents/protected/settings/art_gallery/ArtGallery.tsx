"use client";
import { useGetMyBoughtArtworks } from "@/api/account";
import { BoughtArtwork } from "@/types/gallery.types";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export const ArtGallery = () => {
  const { data: myBoughtArtworks, isLoading, error } = useGetMyBoughtArtworks();
  console.log(myBoughtArtworks);

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-6 w-full flex justify-center items-center min-h-100">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading your gallery...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Art Gallery
        </h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-center">
            Failed to load your artworks. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!myBoughtArtworks || myBoughtArtworks.length === 0) {
    return (
      <div className="p-6 w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Art Gallery
        </h2>
        <div className="p-8 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-500">
            You haven&apos;t purchased any artworks yet.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Browse the marketplace to find your next piece!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Art Gallery</h2>

      <div className="grid md:grid-cols-3 gap-4 w-full">
        {myBoughtArtworks.map((artwork: BoughtArtwork) => (
          <div
            key={artwork.id}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={artwork.artwork.imageUrl}
              alt={artwork.artwork.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-semibold text-center px-2">
                {artwork.artwork.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
