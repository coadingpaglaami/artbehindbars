export interface ChatResponse {
  data: Chat[];
  meta: Meta;
}

export interface Chat {
  id: string;
  createdAt: string;
  updatedAt: string;
  participants: Participant[];
  messages: Message[];
  otherUser: OtherUser;
  unreadCount: number;
}

export interface Participant {
  id: string;
  chatId: string;
  userId: string;
  user: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface OtherUser {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
