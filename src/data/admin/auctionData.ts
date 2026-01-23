import { AuctionArtwork } from "@/interface/admin";

// Helper function to generate random bid data
function getRandomBid(): number {
  return Math.floor(Math.random() * (500 - 50 + 1)) + 50; // Random bid between $50 and $500
}

function getRandomStatus(): "Active" | "Ended" | "Not Started" {
  const statuses: ("Active" | "Ended" | "Not Started")[] = ["Active", "Ended", "Not Started"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Function to generate random artwork auction data
export function generateAuctionArtworkData(length: number): AuctionArtwork[] {
  const titles = [
    "Desert Solitude", "Silent Night", "Future Dreams"
  ];

  const bidders = [
    "ArtCollector99", "GalleryOwner", "ArtLover2021", "AuctionMaster", "CreativeMind"
  ];

  const artworks: AuctionArtwork[] = [];
  const imageFiles = [
    "artwork1.jpg", "artwork2.jpg", "artwork3.png", "artwork4.png", "artwork5.png", "artwork6.jpg", "artwork7.png"
  ];

  for (let i = 0; i < length; i++) {
    const artworkId = (i + 1).toString();
    const artworkTitle = titles[Math.floor(Math.random() * titles.length)];
    const currentBid = getRandomBid(); // Generate a random bid
    const highestBidder = bidders[Math.floor(Math.random() * bidders.length)];
    const status = getRandomStatus();
    const timeRemaining = status === "Active" 
      ? `0d 23h 59m ${Math.floor(Math.random() * 60)}s` // Random time remaining if auction is active
      : status === "Ended"
      ? "Ended"
      : `1d 23h 59m ${Math.floor(Math.random() * 60)}s`; // For Not Started auctions
    const artworkImage = `/artwork/${imageFiles[Math.floor(Math.random() * imageFiles.length)]}`;

    artworks.push({
      artworkId,
      artworkTitle,
      currentBid,
      highestBidder,
      status,
      timeRemaining,
      artworkImage
    });
  }

  return artworks;
}
