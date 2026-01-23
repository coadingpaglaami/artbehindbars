import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArtistData } from "@/interface/admin";
import { Star } from "lucide-react";

export const TopArtists = ({ artists }: { artists: ArtistData[] }) => {
  const maxArtworks = Math.max(...artists.map((a) => a.artworks));

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
          {artists.map((artist, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-lg font-semibold text-gray-400 w-6">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">{artist.name}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${(artist.artworks / maxArtworks) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-sm font-bold">{artist.artworks}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Artists</span>
            <span className="text-2xl font-bold">5</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">Avg Rating</span>
            <span className="text-2xl font-bold">6.0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
