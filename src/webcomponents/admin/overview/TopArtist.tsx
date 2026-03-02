// TopArtist.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TopArtistData } from "@/types";
import { Star, Loader2 } from "lucide-react";

interface TopArtistsProps {
  data?: TopArtistData[];
  isLoading?: boolean;
}

export const TopArtists = ({ data, isLoading = false }: TopArtistsProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Artists</CardTitle>
            <CardDescription>Best selling performers</CardDescription>
          </div>
          <Star className="w-5 h-5 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Top Artists</CardTitle>
            <CardDescription>Best selling performers</CardDescription>
          </div>
          <Star className="w-5 h-5 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px] text-gray-500">
            No artist data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort artists by totalArtwork in descending order
  const sortedArtists = [...data].sort((a, b) => b.totalArtwork - a.totalArtwork);
  const maxArtworks = Math.max(...sortedArtists.map((a) => a.totalArtwork), 1);

  // Calculate average rating (mock data - API doesn't provide this)
  const totalArtworks = sortedArtists.reduce((sum, artist) => sum + artist.totalArtwork, 0);
  const avgArtworks = totalArtworks / sortedArtists.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Top Artists</CardTitle>
          <CardDescription>Best selling performers</CardDescription>
        </div>
        <Star className="w-5 h-5 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedArtists.map((artist, index) => (
            <div key={artist.artistName} className="flex items-center gap-3">
              <div className="text-lg font-semibold text-gray-400 w-6">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">{artist.artistName}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${(artist.totalArtwork / maxArtworks) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-sm font-bold">{artist.totalArtwork}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Artists</span>
            <span className="text-2xl font-bold">{sortedArtists.length}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">Avg Artworks</span>
            <span className="text-2xl font-bold">{avgArtworks.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};