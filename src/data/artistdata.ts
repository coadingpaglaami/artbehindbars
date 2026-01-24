import { ArtistInfo } from "@/interface/artist";

export const artistData: ArtistInfo[] = [
  {
    artistId: "1",
    artistName: "Marcus Williams",
    artistInmateId: "#2019-45782",
    state: "California",
    facilityName: "California State Prison",
    minReleaseDate: "2026-03-01",
    maxReleaseDate: "2028-12-31",
    artistBio:
      "Marcus discovered his passion for art during his incarceration. His work focuses on themes of hope, resilience, and the human spirit.",
    joinedDate: "March 2022",
    artistImage: "/artist/artist1.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "1",
        title: "Hope Beyond Bars",
        image: "/artwork/artwork1.jpg", // Example path for the artwork image
        currentBid: 420,
      },
      {
        artworkId: "2",
        title: "Freedom in Color",
        image: "/artwork/artwork2.jpg",
        currentBid: 500,
      },
    ],
  },
  {
    artistId: "2",
    artistName: "James Carter",
    artistInmateId: "#2021-38452",
    state: "California",
    facilityName: "State Correctional Facility",
    minReleaseDate: "2025-09-01",
    maxReleaseDate: "2027-08-15",
    artistBio:
      "James uses religious imagery to explore themes of redemption and spiritual transformation. His detailed work reflects years of introspection.",
    joinedDate: "November 2021",
    artistImage: "/artist/artist2.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "3",
        title: "Divine Light",
        image: "/artwork/artwork3.png",
        currentBid: 875,
      },
      {
        artworkId: "4",
        title: "Sacred Sanctuary",
        image: "/artwork/artwork4.png",
        currentBid: 820,
      },
    ],
  },
  {
    artistId: "3",
    artistName: "DeShawn Jackson",
    artistInmateId: "#2023-49812",
    state: "California",
    facilityName: "County Detention Center",
    minReleaseDate: "2028-01-01",
    maxReleaseDate: "2030-12-31",
    artistBio:
      "Urban landscapes and street scenes dominate DeShawn's portfolio, reflecting memories and dreams of life beyond.",
    joinedDate: "January 2023",
    artistImage: "/artist/artist3.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "5",
        title: "Urban Dreams",
        image: "/artwork/artwork5.png",
        currentBid: 575,
      },
      {
        artworkId: "6",
        title: "Metamorphosis",
        image: "/artwork/artwork6.jpg",
        currentBid: 640,
      },
    ],
  },
  {
    artistId: "4",
    artistName: "Carlos Rodriguez",
    artistInmateId: "#2018-62753",
    state: "California",
    facilityName: "Federal Prison Camp",
    minReleaseDate: "2026-06-01",
    maxReleaseDate: "2029-05-15",
    artistBio:
      "Carlos blends traditional religious iconography with contemporary themes, creating powerful narratives about faith and forgiveness.",
    joinedDate: "July 2022",
    artistImage: "/artist/artist4.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "7",
        title: "Redemption Path",
        image: "/artwork/artwork7.jpg",
        currentBid: 850,
      },
      {
        artworkId: "8",
        title: "Grace and Mercy",
        image: "/artwork/artwork8.jpg",
        currentBid: 950,
      },
    ],
  },
  {
    artistId: "5",
    artistName: "Andre Thompson",
    artistInmateId: "#2021-36429",
    state: "California",
    facilityName: "Medium Security Prison",
    minReleaseDate: "2025-08-01",
    maxReleaseDate: "2029-01-31",
    artistBio:
      "Andre's vibrant abstract works celebrate the power of color and emotion, offering windows into his inner world and creative freedom.",
    joinedDate: "September 2021",
    artistImage: "/artist/artist1.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "9",
        title: "Metamorphosis",
        image: "/artwork/artwork6.jpg",
        currentBid: 640,
      },
      {
        artworkId: "10",
        title: "Freedom in Color",
        image: "/artwork/artwork2.jpg",
        currentBid: 500,
      },
    ],
  },
  {
    artistId: "6",
    artistName: "Steven Baker",
    artistInmateId: "#2020-23472",
    state: "California",
    facilityName: "State Correctional Facility",
    minReleaseDate: "2027-11-01",
    maxReleaseDate: "2030-06-30",
    artistBio:
      "Steven's artwork explores the intersection of identity and freedom, expressed through both abstract and realistic styles.",
    joinedDate: "January 2022",
    artistImage: "/artist/artist2.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "11",
        title: "Grace and Mercy",
        image: "/artwork/artwork7.png",
        currentBid: 950,
      },
      {
        artworkId: "12",
        title: "Behind the Wall",
        image: "/artwork/artwork2.jpg",
        currentBid: 950,
      },
    ],
  },
  {
    artistId: "7",
    artistName: "Michael Davis",
    artistInmateId: "#2022-67913",
    state: "California",
    facilityName: "Federal Correctional Institution",
    minReleaseDate: "2026-05-15",
    maxReleaseDate: "2029-08-10",
    artistBio:
      "Michael's work emphasizes the importance of spiritual freedom, often blending abstract elements with vivid emotional expression.",
    joinedDate: "February 2021",
    artistImage: "/artist/artist3.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "13",
        title: "Sacred Sanctuary",
        image: "/artwork/artwork1.jpg",
        currentBid: 820,
      },
      {
        artworkId: "14",
        title: "Redemption Path",
        image: "/artwork/artwork6.jpg",
        currentBid: 850,
      },
    ],
  },
  {
    artistId: "8",
    artistName: "Patrick Moore",
    artistInmateId: "#2019-84756",
    state: "California",
    facilityName: "State Prison",
    minReleaseDate: "2026-07-01",
    maxReleaseDate: "2029-12-31",
    artistBio:
      "Patrick's artwork focuses on the human condition, exploring themes of struggle, resilience, and transformation.",
    joinedDate: "March 2022",
    artistImage: "/artist/artist5.jpg", // Example path for the artist's image
    artwork: [
      {
        artworkId: "15",
        title: "Behind the Wall",
        image: "/artwork/artwork3.png",
        currentBid: 950,
      },
      {
        artworkId: "16",
        title: "Urban Dreams",
        image: "/artwork/artwork4.png",
        currentBid: 575,
      },
    ],
  },
];
