"use client";

import { Pencil, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ArtWorkDialogue } from "./ArtWorkDialogue";
import { ArtworkResponseDto } from "@/types/gallery.types";
import { DeleteDialog } from "@/webcomponents/reusable";

interface ArtWorkImageViewProps {
  artworks: ArtworkResponseDto[];
  onDelete: (artworkId: string) => void;
  onEditSuccess: () => void;
  allArtists: string[];
}

export const ArtWorkImageView = ({
  artworks,
  onDelete,
  onEditSuccess,
  allArtists,
}: ArtWorkImageViewProps) => {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkResponseDto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteArtwork, setDeleteArtwork] = useState<ArtworkResponseDto | null>(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => {
          const isAnonymous = artwork.isAnonymous;

          return (
            <div
              key={artwork.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              {/* Image */}
              <div className="relative w-full aspect-square">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                />

                {/* Anonymous Badge */}
                {isAnonymous && (
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-3 py-1 rounded-md text-sm font-medium"
                      style={{
                        backgroundColor: "#FED7AA",
                        color: "#C2410C",
                      }}
                    >
                      Anonymous
                    </span>
                  </div>
                )}

                {/* Action Buttons on Hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    title="View"
                  >
                    <Eye size={20} style={{ color: "#94A3B8" }} />
                  </button>
                  <button
                    onClick={() => handleEdit(artwork)}
                    className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={20} style={{ color: "#94A3B8" }} />
                  </button>
                  <button
                    onClick={() => setDeleteArtwork(artwork)}
                    className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={20} style={{ color: "#94A3B8" }} />
                  </button>
                </div>
              </div>

              {/* Info Content */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {isAnonymous ? "Anonymous" : artwork.artist?.name || "N/A"}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: "#E1EFFE",
                      color: "#1E429F",
                    }}
                  >
                    {artwork.category.replace("_", " ")}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Starting Bid</p>
                    <span className="text-lg font-semibold text-gray-900">
                      ${artwork.startingBidPrice}
                    </span>
                  </div>
                  {typeof artwork.buyItNowPrice === "number" && artwork.buyItNowPrice > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Buy Now</p>
                      <span className="text-sm font-medium text-gray-700">
                        ${artwork.buyItNowPrice}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
   <DeleteDialog
  isOpen={!!deleteArtwork}
  targetName={deleteArtwork?.title || "this artwork"}
  onClose={() => setDeleteArtwork(null)}
  onConfirm={async () => {
    if (!deleteArtwork

    ) return;
     onDelete(deleteArtwork.id);
    setDeleteArtwork(null);
  }}
/>
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