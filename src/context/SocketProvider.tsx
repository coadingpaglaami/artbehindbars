"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import * as api from "@/api/connection/api"; // Adjust path as needed

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();
  console.log(queryClient.getQueryCache().getAll());


  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socketRef.current = socket;

    /* =========================
       GLOBAL SOCKET EVENTS
       ========================= */

    socket.on("connection-request", async(data) => {
      console.log(data,'line 30 soket provider');
      toast.success(data.payload);

  await queryClient.prefetchQuery({
    queryKey: ["getConnectionStatus", data.toUserId], // include userId if needed
    queryFn: () => api.getConnectionStatus(data.toUserId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["myRequests", 1, 10], // default page/limit
    queryFn: () => api.myRequests({ page: 1, limit: 10 }),
  });
    });

    socket.on("connection-accepted", async (data) => {
      toast.success(data.payload);

   await queryClient.prefetchQuery({
    queryKey: ["getConnectionStatus"],
  });

  await queryClient.prefetchQuery({
    queryKey: ["myRequests"],
  });
    });

    return () => {
      socket.off("connection-request");
      socket.off("connection-accepted");
    };
  }, [queryClient]);

  return (
    // eslint-disable-next-line react-hooks/refs
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

/* ===== Hook ===== */
export function useSocket() {
  return useContext(SocketContext);
}
