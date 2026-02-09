"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { ArtistDialogue } from "./ArtistDialogue";
import {  ArtistResponseDto } from "@/types/gallery.types";

interface ArtistTableProps {
  artists: ArtistResponseDto[];
  onEdit: (artist: ArtistResponseDto) => void;
  onDelete: (artistId: string) => void;
}

export const ArtistTable = ({ artists, onEdit, onDelete }: ArtistTableProps) => {
  const [selectedArtist, setSelectedArtist] = useState<ArtistResponseDto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (artist: ArtistResponseDto) => {
    setSelectedArtist(artist);
    setIsDialogOpen(true);
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead style={{ backgroundColor: "#F8FAFC" }}>
              <tr className="border-b" style={{ borderColor: "#E2E8F0" }}>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Artist
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ID Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Facility
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Release Window
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Artworks
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {artists.map((artist) => (
                <tr
                  key={artist.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "#E2E8F0" }}
                >
                  {/* Artist */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: "#DBEAFE" }}
                      >
                        <span className="text-blue-600">
                          {getInitial(artist.name)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {artist.name}
                        </div>
                        <div className="text-sm text-gray-500">{artist.state}</div>
                      </div>
                    </div>
                  </td>

                  {/* ID Number */}
                  <td className="px-6 py-4 text-gray-700">
                    {artist.inmateId}
                  </td>

                  {/* Facility */}
                  <td className="px-6 py-4 text-gray-700">{artist.facilityName}</td>

                  {/* Release Window */}
                  <td className="px-6 py-4 text-gray-700">
               {artist.minReleaseDate} - {artist.maxReleaseDate}
                  </td>

                  {/* Artworks */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      10 Artworks
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(artist.id as unknown as ArtistResponseDto)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} style={{ color: "#94A3B8" }} />
                      </button>
                      <button
                        onClick={() => onDelete(artist.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} style={{ color: "#94A3B8" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <ArtistDialogue
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedArtist(null);
        }}
        artist={selectedArtist}
        mode="edit"
      />
    </>
  );
};