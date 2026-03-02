'use client';
import { QueryClient,QueryClientProvider  } from "@tanstack/react-query";
import { SocketProvider } from "./SocketProvider";
import { useState } from "react";

export default function SocketQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>{children}</SocketProvider>
    </QueryClientProvider>
  );
}
