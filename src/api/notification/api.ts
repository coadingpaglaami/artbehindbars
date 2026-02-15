// api.ts
import axios from "@/lib/axios";
import { NotificationResponseDto } from "@/types/notification.type";

const NOTIFICATIONS = "notification";

/* -------- Get Notifications -------- */
export const getMyNotifications = async (): Promise<NotificationResponseDto[]> => {
  const { data } = await axios.get<NotificationResponseDto[]>(`/${NOTIFICATIONS}`);
  return data;
};

/* -------- Mark Notification as Read -------- */
export const markNotificationAsRead = async (id: string): Promise<NotificationResponseDto> => {
  const { data } = await axios.patch<NotificationResponseDto>(`/${NOTIFICATIONS}/${id}/read`);
  return data;
};

/* -------- Mark All Notifications as Read -------- */
export const markAllNotificationsAsRead = async (userId: string): Promise<NotificationResponseDto[]> => {
  const { data } = await axios.patch<NotificationResponseDto[]>(`/${NOTIFICATIONS}/read/all`, { userId });
  return data;
};

/* -------- Delete Notification -------- */
export const deleteNotification = async (id: string): Promise<{ message: string }> => {
  const { data } = await axios.delete<{ message: string }>(`/${NOTIFICATIONS}/${id}`);
  return data;
};
