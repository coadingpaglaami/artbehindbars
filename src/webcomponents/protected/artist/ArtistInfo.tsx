"use client";

import { ArtistInfo as ArtistInfoType } from "@/interface/artist";
import { Mail, User, MapPin, Building2, Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArtistDialog } from "./ArtistDialog";

export const ArtistInfo = ({ artist }: { artist: ArtistInfoType }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const artistDetails = [
    {
      icon: <User size={20} />,
      label: "Inmate ID",
      value: artist.artistInmateId,
    },
    {
      icon: <MapPin size={20} />,
      label: "State",
      value: artist.state,
    },
    {
      icon: <Building2 size={20} />,
      label: "Facility",
      value: artist.facilityName,
    },
    {
      icon: <Calendar size={20} />,
      label: "Expected Release",
      value: `${artist.minReleaseDate} - ${artist.maxReleaseDate}`,
    },
  ];

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left Side - Image (20%) */}
        <div className="lg:w-1/5">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
            {artist.artistImage ? (
              <Image
                src={artist.artistImage}
                alt={artist.artistName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center">
                <span className="text-white text-6xl font-bold">
                  {getInitial(artist.artistName)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Info (80%) */}
        <div className="lg:w-4/5 flex flex-col gap-6">
          {/* Artist Name and Artwork Count */}
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              {artist.artistName} ({artist.artwork.length})
            </h1>
            <div
              className="h-1 w-32"
              style={{
                background: "linear-gradient(to right, #2563EB, #DC2626)",
              }}
            />
          </div>

          {/* Artist Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artistDetails.map((detail, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#FAFAFA" }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary mt-1">{detail.icon}</div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {detail.label}
                    </div>
                    <div className="font-semibold text-gray-900">
                      {detail.value}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* About the Artist */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              About the Artist
            </h3>
            <p className="text-gray-700 leading-relaxed">{artist.artistBio}</p>
          </div>

          {/* Send Fan Mail Button */}
          <div>
            <Button
              className="bg-primary text-white"
              onClick={() => setIsDialogOpen(true)}
            >
              <Mail size={18} className="mr-2" />
              Send Fan Mail
            </Button>
            <p className="text-sm mt-2" style={{ color: "#737373" }}>
              All messages are reviewed by administration before being forwarded
              to the artist.
            </p>
          </div>
        </div>
      </div>

      {/* Fan Mail Dialog */}
      <ArtistDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        artistName={artist.artistName}
      />
    </>
  );
};