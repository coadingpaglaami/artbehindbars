import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";

/* ================= GET ================= */

export const useGetInfiniteUserChats = (limit: number = 10) =>
  useInfiniteQuery({
    queryKey: ["getUserChats", limit],
    queryFn: ({ pageParam = 1 }) =>
      api.getUserChats({ page: pageParam, limit }),

    getNextPageParam: (lastPage, allPages) => {
      // Adjust this depending on your API response shape

      // Example 1: If API returns hasMore
      if (lastPage.meta.page * lastPage.meta.limit < lastPage.meta.total) {
        return allPages.length + 1;
      }

      // Example 2: If API returns totalPages
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }

      return undefined; // no more pages
    },

    initialPageParam: 1,
  });


/* ================= MUTATIONS ================= */

export const useGetOrCreateChatMutation = () =>
  useMutation({
    mutationKey: ["getOrCreateChat"],
    mutationFn: api.getOrCreateChat,
  });

export const useSendMessageMutation = () =>
  useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: api.sendMessage,
  });

export const useMarkChatSeenMutation = () =>
  useMutation({
    mutationKey: ["markChatSeen"],
    mutationFn: api.markChatSeen,
  });

  export const useGetMessagesQuery = (chatId: string) =>
  useQuery({
    queryKey: ["getMessages", chatId],
    queryFn: () => api.getMessages(chatId),
    enabled: !!chatId, // only run if chatId is provided
  });
