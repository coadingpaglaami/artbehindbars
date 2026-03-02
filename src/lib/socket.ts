import { io, Socket } from "socket.io-client";
import { getClientAccessToken } from "./auth-client";

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  const token = getClientAccessToken();
  if (!token) return null;

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL, {
      auth: {
        token,
      },
      transports: ["websocket"],
    });
  }

  return socket;
}
