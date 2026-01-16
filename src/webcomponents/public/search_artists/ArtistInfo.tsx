import { ArtistInfo } from "@/interface/artist";
import { Calendar, FileImage, MapPin } from "lucide-react";
import Image from "next/image";

export const ArtistInformation = ({ artist }: { artist: ArtistInfo }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Image Section - Full Width, No Padding */}
      <div className="relative w-full aspect-4/3">
        <Image
          src={artist.artistImage || "/placeholder-artist.jpg"}
          alt={artist.artistName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section with Padding */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Artist Name */}
        <h3 className="text-xl font-semibold text-gray-900">
          {artist.artistName}
        </h3>

        {/* Artist Bio - Max 3 lines */}
        <p className="text-gray-600 line-clamp-3 text-sm">{artist.artistBio}</p>

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Artist Details - This section will grow to push button down */}
        <div className="space-y-2 flex-1">
          {/* Facility Name with Location Icon */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} className="shrink-0" />
            <span className="text-sm">{artist.facilityName}</span>
          </div>

          {/* Number of Artworks with Image Icon */}
          <div className="flex items-center gap-2 text-gray-700">
            <FileImage size={18} className="shrink-0" />
            <span className="text-sm">
              {artist.artwork.length}{" "}
              {artist.artwork.length === 1 ? "Artwork" : "Artworks"}
            </span>
          </div>

          {/* Join Date with Calendar Icon */}
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={18} className="shrink-0" />
            <span className="text-sm">{artist.joinedDate}</span>
          </div>
        </div>

        {/* Primary Button - Always at bottom */}
        <button className="w-full py-2.5 px-4 rounded-md font-semibold text-white transition-colors bg-primary mt-auto">
          View Profile
        </button>
      </div>
    </div>
  );
};
