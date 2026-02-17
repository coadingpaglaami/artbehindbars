/* ================= BASIC USER ================= */

export interface ConnectionUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  connectionsCount?: number;
  chatId?: string; // Optional chat ID for direct messaging
  profilePictureUrl?: string;
}

/* ================= ENUM ================= */

export type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED";

/* ================= CONNECTION ================= */

export interface Connection {
  id: string;
  requesterId: string;
  receiverId: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
  requester?: ConnectionUser;
  receiver?: ConnectionUser;
}

/* ================= REQUEST ================= */

export interface CreateConnectionPayload {
  receiverId: string;
}

/* ================= PAGINATION ================= */

export interface Pagination {
  page?: number;
  limit?: number;
}

/* ================= RESPONSES ================= */

export interface PaginatedConnectionResponse {
  data: Connection[];
  page: number;
  limit: number;
  total: number;
}
