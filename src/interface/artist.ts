export interface ArtistInfo {
  artistId: string; //1
  artistName: string; //#John Doe
  artistInmateId: string; //#2019-45782
  state: string; //#California
  facilityName: string; //#California State Prison
  minReleaseDate: string; //#2025-12-31
  maxReleaseDate: string; //#2030-12-31
  artistBio: string; //Marcus discovered his passion for art during his incarceration. His work focuses on themes of hope, resilience, and the human spirit.
  joinedDate: string; //Joined March 2022
  artistImage: string; // URL or path to the artist's image
  artwork: ArtWork[]; 
}

interface ArtWork {
  artworkId: string; //A unique identifier for the artwork
  title: string; //The title of the artwork
  image: string; //URL or path to the artwork image
  currentBid: number; //The current highest bid for the artwork
}
