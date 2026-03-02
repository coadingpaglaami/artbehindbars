/* ================= USER (minimal shape used in chat) ================= */

export interface ChatUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

/* ================= MESSAGE STATUS ================= */

export interface MessageStatus {
  id: string;
  messageId: string;
  userId: string;
  seen: boolean;
  seenAt?: string | null;
}

/* ================= MESSAGE ================= */

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;

  sender?: ChatUser;
  statuses?: MessageStatus[];
}

/* ================= CHAT PARTICIPANT ================= */

export interface ChatParticipant {
  id: string;
  chatId: string;
  userId: string;
  user?: ChatUser;
}

/* ================= CHAT ================= */

export interface Chat {
  id: string;
  createdAt: string;
  updatedAt: string;

  participants: ChatParticipant[];
  messages?: Message[];
}

/* ================= API RESPONSES ================= */

export interface GetUserChatsResponseTwo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: Message | null;
  otherUser: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  unreadCount: number;
}
 

export type GetUserChatsResponse = Chat[];

export type GetMessagesResponse = Message[];

export type GetOrCreateChatResponse = Chat;

export type SendMessageResponse = Message;

export type MarkSeenResponse = {
  success: boolean;
};
