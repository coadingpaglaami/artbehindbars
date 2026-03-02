import axios from "@/lib/axios";
import { AdminDashboardStatsResponseDto, IPaymentData, OrderResponseDto } from "@/types/payment.type";

/* ============================================================
   PAYMENT
============================================================ */

export const checkoutPayment = async (
  payload: IPaymentData,
): Promise<OrderResponseDto> => {
  const { data } = await axios.post<OrderResponseDto>(
    "/payment/checkout",
    payload,
  );

  return data;
};

export const getAdminPaymentStats =
  async (): Promise<AdminDashboardStatsResponseDto> => {
    const { data } = await axios.get<AdminDashboardStatsResponseDto>(
      "/payment/admin-stats",
    );

    return data;
  };

  export const getOrderById = async (
  id: string,
): Promise<OrderResponseDto> => {
  const { data } = await axios.get<OrderResponseDto>(
    `/payment/order/${id}`,
  );

  return data;
};
