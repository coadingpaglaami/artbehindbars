import { MyBidsPage } from "@/interface/bid";

export const myBidsData: MyBidsPage = {
  activeBids: [
    {
      artworkImage: "/artwork/artwork1.jpg",
      title: "Hope Beyond Bars",
      artist: "Marius Williams",
      userBid: 420,
      currentBid: 420,
      timeRemaining: "14 hours 29 minutes",
      bidStatus: "Winning",
      isCompleted: false,
      onIncreaseBid: () => {
        console.log("Increase bid clicked!");
      },
      onViewDetails: () => {
        console.log("View details clicked!");
      },
    },
    {
      artworkImage: "/artwork/artwork2.jpg",
      title: "Divine Light",
      artist: "James Carter",
      userBid: 850,
      currentBid: 875,
      timeRemaining: "24 hours 29 minutes",
      bidStatus: "Outbid",
      isCompleted: false,
      onIncreaseBid: () => {
        console.log("Increase bid clicked!");
      },
      onViewDetails: () => {
        console.log("View details clicked!");
      },
    },
    {
      artworkImage: "/artwork/artwork3.png",
      title: "Redemption Path",
      artist: "Carlos Rodriguez",
      userBid: 680,
      currentBid: 680,
      timeRemaining: "23 hours 28 minutes",
      bidStatus: "Winning",
      isCompleted: false,
      onIncreaseBid: () => {
        console.log("Increase bid clicked!");
      },
      onViewDetails: () => {
        console.log("View details clicked!");
      },
    },
    {
      artworkImage: "/artwork/artwork4.png",
      title: "Urban Dreams",
      artist: "DeShaun Jackson",
      userBid: 500,
      currentBid: 520,
      auctionEndDate: "1/9/2026",
      bidStatus: "Lost", // This means the user did not win.
      isCompleted: true,
      onIncreaseBid: undefined, // Cannot increase bid after auction ends.
      onViewDetails: () => {
        console.log("View details clicked!");
      },

      timeRemaining: "0 hours 0 minutes", // Auction ended
    },
  ],

  bidStats: {
    totalBids: 4,
    winningBids: 2,
    outbidBids: 1,
    wonBids: 0,
  },
};
