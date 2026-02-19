"use client";

import React, { createContext, useContext, useEffect } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Message } from "@/types/chat.type";
import {
  AuctionBidDto,
  PaginatedResponseDto,
  PlaceBidDto,
} from "@/types/auction.type";

type SocketContextType = Socket | null;

interface SocketData {
  payload: {
    [key: string]: unknown;
  };
}

const SocketContext = createContext<SocketContextType>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const socket = getSocket(); // singleton — no state needed

  useEffect(() => {
    if (!socket) return;

    /* =========================
       CONNECTION EVENTS
    ==========================*/

    const handleConnectionRequest = (data: SocketData) => {
      toast.success(data.payload.message as string);
      console.log(data.payload);

      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "notifications",
            "getConnectionStatus",
            "getMyConnections",
            "getIncomingRequests",
            "myRequests",
          ].includes(query.queryKey[0] as string),
      });
    };

    const handleConnectionAccepted = (data: SocketData) => {
      toast.success(data.payload.message as string);

      queryClient.invalidateQueries({
        predicate: (query) =>
          [
            "notifications",
            "getConnectionStatus",
            "getMyConnections",
            "getIncomingRequests",
            "myRequests",
          ].includes(query.queryKey[0] as string),
      });
    };

    /* =========================
       CHAT EVENTS
    ==========================*/

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(
        ["getMessages", message.chatId],
        (old: Message[] = []) => [...old, message],
      );
    };

    const handleMessageSeen = ({
      messageId,
      seenAt,
      chatId,
    }: {
      messageId: string;
      seenAt: boolean;
      chatId: string;
    }) => {
      queryClient.setQueryData(
        ["getMessages", "markChatSeen", chatId],
        (old: Message[] = []) =>
          old.map((msg) =>
            msg.id === messageId ? { ...msg, statuses: [{ seenAt }] } : msg,
          ),
      );
    };

    // const handleAuctionNewBid = (
    //   data: PlaceBidDto & { firstName?: string; lastName?: string },
    //   socket: SocketData,
    // ) => {
    //   toast.success(socket.payload.message as string);

    //   // ✅ Invalidate auction list queries
    //   queryClient.invalidateQueries({
    //     predicate: (query) => query.queryKey[0] === "auctions",
    //   });

    //   // ✅ Invalidate artwork related queries
    //   queryClient.invalidateQueries({
    //     predicate: (query) => query.queryKey[0] === "artwork",
    //   });

    //   // ✅ Invalidate MY AUCTION HISTORY (this will refetch useMyAuctionHistory)
    //   queryClient.invalidateQueries({
    //     predicate: (query) =>
    //       query.queryKey[0] === "auction" && query.queryKey[1] === "my-history",
    //   });

    //   // ✅ Optimistically update bid list cache
    //   const bidQueries = queryClient.getQueryCache().findAll({
    //     predicate: (q) =>
    //       q.queryKey[0] === "auction" &&
    //       q.queryKey[1] === "bids" &&
    //       q.queryKey[2] === data.auctionId,
    //   });

    //   bidQueries.forEach((query) => {
    //     queryClient.setQueryData(
    //       query.queryKey,
    //       (old: PaginatedResponseDto<AuctionBidDto>) => {
    //         if (!old) return old;

    //         return {
    //           ...old,
    //           data: [data, ...old.data],
    //         };
    //       },
    //     );
    //   });
    // };
    const handleAuctionNewBid = (
      data: PlaceBidDto & {
        firstName?: string;
        lastName?: string;
        message?: string;
      },
    ) => {
      if (data?.message) {
        toast.success(data.message);
      }

      // ✅ Invalidate auction list
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "auctions",
      });

      // ✅ Invalidate artwork
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "artwork",
      });

      // ✅ Invalidate MY AUCTION HISTORY
      queryClient.invalidateQueries({
        queryKey: ["auction", "my-history"],
        exact: false,
      });

      // ✅ Optimistic update for bids list
      const bidQueries = queryClient.getQueryCache().findAll({
        predicate: (q) =>
          q.queryKey[0] === "auction" &&
          q.queryKey[1] === "bids" &&
          q.queryKey[2] === data.auctionId,
      });

      bidQueries.forEach((query) => {
        queryClient.setQueryData(
          query.queryKey,
          (old: PaginatedResponseDto<AuctionBidDto>) => {
            if (!old) return old;

            return {
              ...old,
              data: [data, ...old.data],
            };
          },
        );
      });
    };

    /* =========================
       ATTACH LISTENERS
    ==========================*/

    socket.on("connection-request", handleConnectionRequest);
    socket.on("connection-accepted", handleConnectionAccepted);
    socket.on("new_message", handleNewMessage);
    socket.on("message_seen", handleMessageSeen);
    socket.on("auction:newBid", handleAuctionNewBid);

    /* =========================
       CLEANUP
    ==========================*/

    return () => {
      socket.off("connection-request", handleConnectionRequest);
      socket.off("connection-accepted", handleConnectionAccepted);
      socket.off("new_message", handleNewMessage);
      socket.off("message_seen", handleMessageSeen);
      socket.off("auction:newBid", handleAuctionNewBid);
    };
  }, [socket, queryClient]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
