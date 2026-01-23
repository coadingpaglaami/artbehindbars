export interface FanMailInterface {
  messageId: string; // Unique identifier for the message
  from: string; // Sender of the message
  to: string; // Recipient (Artist)
  subject: string; // Subject of the message
  body: string; // Content of the message
  date: string; // Date when the message was sent
  status: "Unread" | "Read"; // Status of the message
}
