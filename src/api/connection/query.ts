import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";
import { Pagination } from "@/types/connection.type";

/* ================= GET ================= */

export const useGetIncomingRequests = ({ page = 1, limit = 10 }: Pagination) =>
  useQuery({
    queryKey: ["getIncomingRequests", page, limit],
    queryFn: () => api.getIncomingRequests({ page, limit }),
  });

export const useGetMyConnectionsInfinite = (limit: number = 10) =>
  useInfiniteQuery({
    queryKey: ["getMyConnections", limit],

    queryFn: ({ pageParam = 1 }) =>
      api.getMyConnections({
        page: pageParam,
        limit,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);

      if (lastPage.page < totalPages) {
        return lastPage.page + 1;
      }

      return undefined; // no more pages
    },
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

export const useGetMyRequests = ({ page = 1, limit = 10 }: Pagination) =>
  useQuery({
    queryKey: ["myRequests", page, limit],
    queryFn: () => api.myRequests({ page, limit }),
  });
