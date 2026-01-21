export interface ArtistInfo {
  artistId: string; // Unique artist identifier
  artistName: string; // Name of the artist
  artistIdNumber: string; // Unique ID number for the artist
  state: string; // State abbreviation (e.g., "CA" for California)
  facility: string; // Facility where the artist is located
  releaseStartYear: number; // Start year of the release window
  releaseEndYear: number; // End year of the release window
  artworks: number; // Number of artworks created by the artist
}
