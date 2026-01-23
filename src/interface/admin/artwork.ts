export interface Artwork {
  artworkId: string; // Unique identifier for the artwork
  artworkTitle: string; // Title of the artwork
  artist: string; // Name of the artist
  category: "Religious" | "Non Religious"; // Category of the artwork
  price: number; // Price of the artwork
  status: "Available" | "Auction" | "Sold"; // Current status of the artwork
  artworkImage: string; // Image URL or path for the artwork
}
