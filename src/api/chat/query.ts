import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./api";

/* ================= GET ================= */

export const useGetUserChats = () =>
  useQuery({
    queryKey: ["getUserChats"],
    queryFn: api.getUserChats,
  });

export const useGetMessages = (chatId: string) =>
  useQuery({
    queryKey: ["getMessages", chatId],
    queryFn: () => api.getMessages(chatId),
    enabled: !!chatId,
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
