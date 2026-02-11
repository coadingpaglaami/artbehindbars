/* ============================================================
   ORDER STATUS
============================================================ */

export type OrderStatus =
  | "PENDING"
  | "COMPLETED"
  | "SHIPPED"
  | "CANCELLED";

/* ============================================================
   SHIPPING INFO
============================================================ */

export interface ShippingInfoDto {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

/* ============================================================
   PAYMENT REQUEST
============================================================ */

export interface IPaymentData {
  sourceId: string;
  amount: number; // in cents
  artworkId: string;
  shippingInfo: ShippingInfoDto;
}

/* ============================================================
   ORDER RESPONSE (Safe Frontend Version)
============================================================ */

export interface OrderResponseDto {
  id: string;
  artworkId: string;
  buyerId: string;

  squarePaymentId: string;
  totalAmount: number;
  status: OrderStatus;

  shippingFullName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;

  createdAt: string;
  updatedAt: string;
}

/* ============================================================
   ADMIN DASHBOARD STATS
============================================================ */

export interface AdminDashboardStatsResponseDto {
  dashboard: {
    currentMonth: {
      revenue: number;
      salesCount: number;
    };
    lastMonth: {
      revenue: number;
      salesCount: number;
    };
    revenueComparison: {
      difference: number;
      isGrowth: boolean;
    };
  };
}
