export interface AuctionArtwork {
  artworkId: string; // Unique identifier for the artwork
  artworkTitle: string; // Title of the artwork
  currentBid: number; // Current bid price
  highestBidder: string; // Highest bidder's username
  status: "Active" | "Ended" | "Not Started"; // Status of the auction
  timeRemaining: string; // Time remaining in the auction
  artworkImage: string; // Image path for the artwork
}
