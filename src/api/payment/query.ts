import {
  AdminDashboardStatsResponseDto,
  IPaymentData,
  OrderResponseDto,
} from "@/types/payment.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkoutPayment, getAdminPaymentStats, getOrderById } from "./api";

/* ============================================================
   QUERY KEYS
============================================================ */

export const paymentKeys = {
  checkout: () => ["payment", "checkout"] as const,
  adminStats: () => ["payment", "admin-stats"] as const,
};

/* ============================================================
   MUTATIONS
============================================================ */

export const useCheckoutPayment = () =>
  useMutation<OrderResponseDto, Error, IPaymentData>({
    mutationKey: paymentKeys.checkout(),
    mutationFn: checkoutPayment,
  });

/* ============================================================
   QUERIES
============================================================ */

export const useAdminPaymentStats = () =>
  useQuery<AdminDashboardStatsResponseDto>({
    queryKey: paymentKeys.adminStats(),
    queryFn: getAdminPaymentStats,
    staleTime: 1000 * 60 * 5, // 5 minutes (stats don't change every second)
  });

  export const useGetOrderById = (id: string) =>
  useQuery<OrderResponseDto>({
    queryKey: ['orders', id],
    queryFn: () => getOrderById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 2, // 2 min cache (order doesn't change often)
  });