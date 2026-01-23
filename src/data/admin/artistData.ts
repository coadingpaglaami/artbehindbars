import { ArtistInfo } from "@/interface/admin";

// Helper function to generate random dates within a range
function getRandomYear(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

// Function to generate random artist data
export function generateArtistData(length: number): ArtistInfo[] {
  const names = [
    "John Doe",
    "Michael Smith",
    "Sarah Jones",
    "David Wilson",
    "Robert Brown",
    "Alice Johnson",
    "James White",
    "Emily Harris",
    "Sophia Clark",
    "William Taylor",
  ];

  const facilities = [
    "San Quentin",
    "Huntsville",
    "Bedford Hills",
    "Union CI",
    "Stateville",
    "Pelican Bay",
    "Rikers Island",
    "Sing Sing",
    "Folsom",
    "Leavenworth",
  ];

  const states = ["CA", "TX", "NY", "FL", "IL", "OH", "PA", "MI", "VA", "NC"];

  const artists: ArtistInfo[] = [];

  for (let i = 0; i < length; i++) {
    const artistId = (i + 1).toString();
    const artistName = names[Math.floor(Math.random() * names.length)];
    const artistIdNumber = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100000)}`;
    const state = states[Math.floor(Math.random() * states.length)];
    const facility = facilities[Math.floor(Math.random() * facilities.length)];
    const releaseStartYear = getRandomYear(2024, 2030);
    const releaseEndYear = releaseStartYear + Math.floor(Math.random() * 10);
    const artworks = Math.floor(Math.random() * 10) + 1; // Random between 1 to 10

    artists.push({
      artistId,
      artistName,
      artistIdNumber,
      state,
      facility,
      releaseStartYear,
      releaseEndYear,
      artworks,
    });
  }

  return artists;
}

