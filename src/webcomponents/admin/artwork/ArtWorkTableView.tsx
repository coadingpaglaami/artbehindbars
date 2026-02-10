"use client";

import { Pencil, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ArtWorkDialogue } from "./ArtWorkDialogue";
import { ArtworkResponseDto } from "@/types/gallery.types";

interface ArtWorkTableViewProps {
  artworks: ArtworkResponseDto[];
  onDelete: (artworkId: string) => void;
  onEditSuccess: () => void;
  allArtists: string[];
}

export const ArtWorkTableView = ({
  artworks,
  onDelete,
  onEditSuccess,
  allArtists,
}: ArtWorkTableViewProps) => {
  const [selectedArtwork, setSelectedArtwork] =
    useState<ArtworkResponseDto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (artwork: ArtworkResponseDto) => {
    setSelectedArtwork(artwork);
    setIsDialogOpen(true);
  };

  const handleEditSuccess = () => {
    onEditSuccess();
    setIsDialogOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr className="border-b" style={{ borderColor: "#E2E8F0" }}>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Artwork
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Artist
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Starting Bid
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Buy Now
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {artworks.map((artwork) => {
                return (
                  <tr
                    key={artwork.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={artwork.imageUrl}
                            alt={artwork.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium text-gray-900">
                          {artwork.title}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {artwork.isAnonymous ? (
                        <span
                          className="px-2 py-1 rounded text-sm"
                          style={{
                            backgroundColor: "#FED7AA",
                            color: "#C2410C",
                          }}
                        >
                          Anonymous
                        </span>
                      ) : (
                        artwork.artist?.name || "N/A"
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {artwork.category.replace("_", " ")}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${artwork.startingBidPrice}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {typeof artwork.buyItNowPrice === "number" &&
                      artwork.buyItNowPrice > 0
                        ? `$${artwork.buyItNowPrice}`
                        : "Auction Only"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} style={{ color: "#94A3B8" }} />
                        </button>
                        <button
                          onClick={() => handleEdit(artwork)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil size={18} style={{ color: "#94A3B8" }} />
                        </button>
                        <button
                          onClick={() => onDelete(artwork.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} style={{ color: "#94A3B8" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ArtWorkDialogue
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedArtwork(null);
        }}
        artwork={selectedArtwork}
        mode="edit"
        allArtists={allArtists}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};
