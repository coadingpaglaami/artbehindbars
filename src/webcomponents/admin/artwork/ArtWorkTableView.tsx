"use client";

import { Artwork } from "@/interface/admin";
import { Pencil, Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ArtWorkDialogue } from "./ArtWorkDialogue";

interface ArtWorkTableViewProps {
  artworks: Artwork[];
  onEdit: (artwork: Artwork) => void;
  onDelete: (artworkId: string) => void;
}

export const ArtWorkTableView = ({
  artworks,
  onEdit,
  onDelete,
}: ArtWorkTableViewProps) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsDialogOpen(true);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Available":
        return {
          bg: "#DEF7EC",
          text: "#03543F",
        };
      case "Auction":
        return {
          bg: "#E1EFFE",
          text: "#1E429F",
        };
      case "Sold":
        return {
          bg: "#F3F4F6",
          text: "#6B7280",
        };
      default:
        return {
          bg: "#F3F4F6",
          text: "#6B7280",
        };
    }
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
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {artworks.map((artwork) => {
                const statusStyle = getStatusStyle(artwork.status);
                return (
                  <tr
                    key={artwork.artworkId}
                    className="border-b hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "#E2E8F0" }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={artwork.artworkImage}
                            alt={artwork.artworkTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="font-medium text-gray-900">
                          {artwork.artworkTitle}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-700">{artwork.artist}</td>

                    <td className="px-6 py-4 text-gray-500">{artwork.category}</td>

                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${artwork.price}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                        }}
                      >
                        {artwork.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye size={18} style={{ color: "#94A3B8" }} />
                        </button>
                        {artwork.status !== "Sold" && (
                          <button
                            onClick={() => handleEdit(artwork)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={18} style={{ color: "#94A3B8" }} />
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(artwork.artworkId)}
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
      />
    </>
  );
};