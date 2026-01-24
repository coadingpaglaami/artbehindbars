"use client";
import { artistData } from "@/data/artistdata";
import { ArtistInfo } from "@/interface/artist";
import { SearchBar } from "@/webcomponents/reusable";
import { useMemo, useState } from "react";
import { ArtistInformation } from "./ArtistInfo";

export const SearchArtists = () => {
  const [search, setSearch] = useState("");

  const filteredArtists = useMemo<ArtistInfo[]>(() => {
    return artistData.filter((artist) => {
      const searchMatch =
        artist.artistName.toLowerCase().includes(search.toLowerCase()) ||
        artist.artistBio.toLowerCase().includes(search.toLowerCase());

      return searchMatch;
    });
  }, [search]);
  return (
    <div className="py-16 flex flex-col gap-6 lg:px-8 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="md:text-4xl text-2xl font-semibold ">
          Search Artists
        </h2>
        <span className="text-[#525252]">
          Discover the talented artists behind our collection and learn their
          stories.
        </span>
      </div>
      <SearchBar
        placeholder="Search by artist name or biography..."
        value={search}
        onChange={setSearch}
      />
      <div className="flex flex-col gap-1.5">
        <span className="text-sm ">
          {" "}
          Showing {filteredArtists.length} results
        </span>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredArtists.map((artist) => (
            <ArtistInformation key={artist.artistId} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};
