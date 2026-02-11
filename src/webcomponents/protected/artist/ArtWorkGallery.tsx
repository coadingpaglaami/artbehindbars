
import { ArtistResponseDto, ArtworkResponseDto, PaginatedResponseDto } from "@/types/gallery.types";
import Image from "next/image";
import Link from "next/link";

interface ArtWorkGalleryProps {
  artist: ArtistResponseDto;
  artworks: PaginatedResponseDto<ArtworkResponseDto>;
}

export const ArtWorkGallery = ({ artist, artworks }: ArtWorkGalleryProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Artwork Gallery
        </h2>
        <p className="text-gray-600">
          Explore all available and sold artworks by {artist.name}
        </p>
      </div>

      {/* Artwork Grid */}
      {artworks?.meta?.total > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artworks.data?.map((artwork) => (
            <Link
              href={`/product/${artwork.id}`}
              key={artwork.id}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {/* Artwork Image */}
                <div className="relative w-full aspect-square">
                  <Image
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Artwork Info */}
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {artwork.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Starting Bid</span>
                    <span className="font-bold text-lg text-primary">
                      ${artwork.startingBidPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  {artwork.buyItNowPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Buy Now</span>
                      <span className="font-bold text-sm text-gray-900">
                        ${artwork.buyItNowPrice.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Artworks Yet
          </h3>
          <p className="text-gray-600">
            {artist.name} hasn&apos;t uploaded any artworks yet. Check back
            later!
          </p>
        </div>
      )}
    </div>
  );
};