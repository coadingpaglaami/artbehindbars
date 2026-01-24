import { Artwork } from "@/interface/admin";

// Helper function to generate random data
function getRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomStatus(): "Available" | "Auction" | "Sold" {
  const statuses: ("Available" | "Auction" | "Sold")[] = ["Available", "Auction", "Sold"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Function to generate random artwork data
export function generateArtworkData(length: number): Artwork[] {
  const titles = [
    "Freedom of Mind", "Desert Solitude", "Abstract Thoughts", "Hope", "Bars and Stripes"
  ];

  const artists = [
    "John Doe", "Michael Smith", "Anonymous", "Sarah Jones", "Robert Brown"
  ];

  const categories: ("Religious" | "Non Religious")[] = ["Religious", "Non Religious"];

  const imageFiles = [
    "artwork1.jpg", "artwork2.jpg", "artwork3.png", "artwork4.png", "artwork5.png", "artwork6.jpg", "artwork7.png"
  ];

  const artworks: Artwork[] = [];

  for (let i = 0; i < length; i++) {
    const artworkId = (i + 1).toString();
    const artworkTitle = titles[Math.floor(Math.random() * titles.length)];
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = getRandomPrice(100, 500); // Random price between $100 and $500
    const status = getRandomStatus();

    // Randomly pick an image from the imageFiles array
    const artworkImage = `/artwork/${imageFiles[Math.floor(Math.random() * imageFiles.length)]}`;

    artworks.push({
      artworkId,
      artworkTitle,
      artist,
      category,
      price,
      status,
      artworkImage
    });
  }

  return artworks;
}
