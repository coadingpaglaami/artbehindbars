"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetConnectionStatus, useGetMyRequests } from "@/api/connection";
import { ClientSub } from "@/lib/auth-client";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const clientSub = ClientSub();
  const { refetch } = useGetMyRequests({ page: 1, limit: 10 });
  const { refetch: refetchConnectionStatus } = useGetConnectionStatus(
    clientSub as string,
  );
  console.log(clientSub)
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

    socket.on("connection-request", async (data) => {
      console.log(data, "line 30 soket provider");
      toast.success(data.payload);
      refetch();
      refetchConnectionStatus();
      queryClient.invalidateQueries({ queryKey:["notifications"] });
    });

    socket.on("connection-accepted", async (data) => {
      toast.success(data.payload);
      queryClient.invalidateQueries({ queryKey:["notifications"] });
      refetch();
      refetchConnectionStatus();
    });

    return () => {
      socket.off("connection-request");
      socket.off("connection-accepted");
    };
  }, [refetch, refetchConnectionStatus,queryClient]);

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
