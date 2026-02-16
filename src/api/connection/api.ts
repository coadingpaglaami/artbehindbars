import axios from "@/lib/axios";
import {
  CreateConnectionPayload,
  PaginatedConnectionResponse,
  Connection,
  Pagination,
} from "@/types/connection.type";

/* ================= POST ================= */

export const sendConnectionRequest = async (
  payload: CreateConnectionPayload,
): Promise<Connection> => {
  const { data } = await axios.post("/connections", payload);
  return data;
};

/* ================= PATCH ================= */

export const acceptConnection = async (
  connectionId: string,
): Promise<Connection> => {
  const { data } = await axios.patch(`/connections/${connectionId}/accept`);
  return data;
};

export const rejectConnection = async (
  connectionId: string,
): Promise<Connection> => {
  const { data } = await axios.patch(`/connections/${connectionId}/reject`);
  return data;
};

/* ================= DELETE ================= */

export const disconnectConnection = async (
  connectionId: string,
): Promise<{ success: boolean }> => {
  const { data } = await axios.delete(`/connections/${connectionId}`);
  return data;
};

/* ================= GET ================= */

export const getIncomingRequests = async (
  params: Pagination,
): Promise<PaginatedConnectionResponse> => {
  const { data } = await axios.get("/connections/requests", { params });
  return data;
};

export const getMyConnections = async (
  params: Pagination,
): Promise<PaginatedConnectionResponse> => {
  const { data } = await axios.get("/connections", { params });
  return data;
};

export const getConnectionStatus = async (
  userId: string,
): Promise<{ direction: string; status: string, connectionId?: string }> => {
  const { data } = await axios.get(`/connections/${userId}/status`);
  return data;
};
