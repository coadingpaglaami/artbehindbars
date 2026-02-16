import axios from "@/lib/axios";
import {
  GetMessagesResponse,
  GetOrCreateChatResponse,
  SendMessageResponse,
  MarkSeenResponse,
  GetUserChatsResponseTwo,
} from "@/types/chat.type";


/* ================= POST ================= */

export const getOrCreateChat = async (
  userId: string,
): Promise<GetOrCreateChatResponse> => {
  const { data } = await axios.post(`/chat/with/${userId}`);
  return data;
};

export const sendMessage = async ({
  chatId,
  content,
}: {
  chatId: string;
  content: string;
}): Promise<SendMessageResponse> => {
  const { data } = await axios.post(`/chat/${chatId}/message`, { content });
  return data;
};

export const markChatSeen = async (
  chatId: string,
): Promise<MarkSeenResponse> => {
  const { data } = await axios.post(`/chat/${chatId}/seen`);
  return data;
};

/* ================= GET ================= */

export const getUserChats = async (): Promise<GetUserChatsResponseTwo> => {
  const { data } = await axios.get("/chat");
  return data;
};

export const getMessages = async (
  chatId: string,
): Promise<GetMessagesResponse> => {
  const { data } = await axios.get(`/chat/${chatId}/messages`);
  return data;
};
