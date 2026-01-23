"use client";

import { Artwork } from "@/interface/admin";
import { Pencil, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ArtWorkDialogue } from "./ArtWorkDialogue";

interface ArtWorkImageViewProps {
  artworks: Artwork[];
  onEdit: (artwork: Artwork) => void;
  onDelete: (artworkId: string) => void;
}

export const ArtWorkImageView = ({
  artworks,
  onEdit,
  onDelete,
}: ArtWorkImageViewProps) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsDialogOpen(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Available":
        return { bg: "#DEF7EC", text: "#03543F" };
      case "Auction":
        return { bg: "#E1EFFE", text: "#1E429F" };
      case "Sold":
        return { bg: "#F3F4F6", text: "#6B7280" };
      default:
        return { bg: "#F3F4F6", text: "#6B7280" };
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => {
          const statusStyle = getStatusStyle(artwork.status);
          const isAnonymous = artwork.artist === "Anonymous";

          return (
            <div
              key={artwork.artworkId}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              {/* Image */}
              <div className="relative w-full aspect-square">
                <Image
                  src={artwork.artworkImage}
                  alt={artwork.artworkTitle}
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
                  {artwork.status !== "Sold" && (
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                      title="Edit"
                    >
                      <Pencil size={20} style={{ color: "#94A3B8" }} />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(artwork.artworkId)}
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
                      {artwork.artworkTitle}
                    </h3>
                    <p className="text-sm text-gray-500">{artwork.artist}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                    style={{
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.text,
                    }}
                  >
                    {artwork.status}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    ${artwork.price}
                  </span>
                  <span className="text-sm text-gray-600">
                    {artwork.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ArtWorkDialogue
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedArtwork(null);
        }}
        artwork={selectedArtwork}
        mode="edit"
      />
    </>
  );
};