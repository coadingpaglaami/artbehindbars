export interface ProductProps {
  productId: string;
  prouductPhoto: string;
  productArtist: string;
  productTitle: string;
  productCategory: "Religious" | "Non Religious";
  productPrice: number;
  auctionPrice?: number;
  remainingTime?: Date;
  isSoldOut?: boolean;
}
