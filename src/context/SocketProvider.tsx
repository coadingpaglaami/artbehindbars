"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socketRef.current = socket;

    /* =========================
       GLOBAL SOCKET EVENTS
       ========================= */

    socket.on("connection-request", (data) => {
      toast.success(data.payload);

      queryClient.refetchQueries({
        queryKey: ["getConnectionStatus"],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ["myRequests"],
        exact: false,
      });
    });

    socket.on("connection-accepted", (data) => {
      toast.success(data.payload);

      queryClient.refetchQueries({
        queryKey: ["getConnectionStatus"],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ["myRequests"],
        exact: false,
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
