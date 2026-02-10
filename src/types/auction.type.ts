export interface AuctionBidDto {
  userId: string;
  firstName?: string;
  lastName?: string;
  bidPrice: number;
  createdAt: Date;
}

export interface PlaceBidDto {
  auctionId: string;
  bidPrice: number;
}