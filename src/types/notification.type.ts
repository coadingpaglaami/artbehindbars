// notification.type.ts

export interface NotificationResponseDto {
  id: string;
  title: string;
  type: "PAYMENT" | "LIKE" | "COMMENT" | "ADMIN" | "INFO";
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRequestDto {
  message: string;
  userId: string;
}

export interface MarkNotificationAsReadRequestDto {
  notificationId: string;
}

export interface DeleteNotificationRequestDto {
  notificationId: string;
}
