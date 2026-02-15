// useNotifications.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "./api"; // Importing API functions

import { NotificationResponseDto } from "@/types/notification.type"; // Importing types

/* -------- Get Notifications -------- */
export const useGetNotificationsQuery = () =>
  useQuery<NotificationResponseDto[], Error>({
    queryKey: ["notifications"],
    queryFn: () => getMyNotifications(),
  });

/* -------- Mark Notification as Read -------- */
export const useMarkNotificationAsReadMutation = () =>
  useMutation<NotificationResponseDto, Error, string>({
    mutationKey: ["markNotificationAsRead"],
    mutationFn: markNotificationAsRead,
  });

/* -------- Mark All Notifications as Read -------- */
export const useMarkAllNotificationsAsReadMutation = () =>
  useMutation<NotificationResponseDto[], Error, string>({
    mutationKey: ["markAllNotificationsAsRead"],
    mutationFn: markAllNotificationsAsRead,
  });

/* -------- Delete Notification -------- */
export const useDeleteNotificationMutation = () =>
  useMutation<{ message: string }, Error, string>({
    mutationKey: ["deleteNotification"],
    mutationFn: deleteNotification,
  });
