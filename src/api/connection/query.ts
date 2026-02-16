import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";
import { Pagination } from "@/types/connection.type";

/* ================= GET ================= */

export const useGetIncomingRequests = ({ page = 1, limit = 10 }: Pagination) =>
  useQuery({
    queryKey: ["getIncomingRequests", page, limit],
    queryFn: () => api.getIncomingRequests({ page, limit }),
  });

export const useGetMyConnections = ({ page = 1, limit = 10 }: Pagination) =>
  useQuery({
    queryKey: ["getMyConnections", page, limit],
    queryFn: () => api.getMyConnections({ page, limit }),
  });

/* ================= MUTATIONS ================= */

export const useSendConnectionRequestMutation = () =>
  useMutation({
    mutationKey: ["sendConnectionRequest"],
    mutationFn: api.sendConnectionRequest,
  });

export const useAcceptConnectionMutation = () =>
  useMutation({
    mutationKey: ["acceptConnection"],
    mutationFn: api.acceptConnection,
  });

export const useRejectConnectionMutation = () =>
  useMutation({
    mutationKey: ["rejectConnection"],
    mutationFn: api.rejectConnection,
  });

export const useDisconnectConnectionMutation = () =>
  useMutation({
    mutationKey: ["disconnectConnection"],
    mutationFn: api.disconnectConnection,
  });

export const useGetConnectionStatus = (userId: string) =>
  useQuery({
    queryKey: ["getConnectionStatus", userId],
    queryFn: () => api.getConnectionStatus(userId),
  });