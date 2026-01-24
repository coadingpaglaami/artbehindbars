export interface Message {
  senderName: string; // The name of the person who sent the message
  subject: string; // The subject or title of the message
  messageBody: string; // The body/content of the message
  timestamp: string; // The date and time when the message was sent
  isRead: boolean;
}
