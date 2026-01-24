"use client";

import { artistData } from "@/data/artistdata";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArtistInfo } from "./ArtistInfo";
import { ArtWorkGallery } from "./ArtWorkGallery";

export const ArtistProfile = ({ artistId }: { artistId: string }) => {
  const { push } = useRouter();
  const artist = artistData.find((artist) => artist.artistId === artistId);

  if (!artist) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
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

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => push("/artists")}
          className="text-gray-400 hover:text-gray-600 flex items-center gap-2.5 p-2.5 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Search Artist
        </button>

        <div className="py-16 flex flex-col gap-12">
          {/* Artist Info Section */}
          <ArtistInfo artist={artist} />

          {/* Artwork Gallery Section */}
          <ArtWorkGallery artist={artist} />
        </div>
      </div>
    </div>
  );
};
