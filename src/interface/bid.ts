export interface Bid {
  artworkImage: string;
  title: string;
  artist: string;
  userBid: number;
  currentBid: number;
  timeRemaining: string;
  bidStatus: "Winning" | "Outbid" | "Lost";
  auctionEndDate?: string; // Optional field, will be set when the auction ends.
  isCompleted: boolean; // Marks if the auction has completed.
  onIncreaseBid?: () => void;
  onViewDetails: () => void;
}

interface BidStats {
  totalBids: number;
  winningBids: number;
  outbidBids: number;
  wonBids: number;
}

export interface MyBidsPage {
  activeBids: Bid[];
  bidStats: BidStats;
}
