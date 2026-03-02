export interface ProductProps {
  productId: string;
  prouductPhoto: string;
  productArtist: string;
  productTitle: string;
  productCategory: "Religious" | "Non_Religious";
  productPrice: number;
  auctionPrice?: number;
  remainingTime?: Date;
  isSoldOut?: boolean;
  bitHistory?: Bit[];
}

interface Bit {
  name: string;
  value: number;
  timeStamp: Date;
}
