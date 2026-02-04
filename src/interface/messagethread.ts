export interface Message {
  messageId: string; // Unique identifier for the message
  from: string; // Sender of the message (either 'user' or the other person)
  body: string; // Content of the message
  timestamp: string; // Time when the message was sent (e.g., '2023-10-24')
  status: "Read" | "Unread"; // Status of the message
}

// Represents a conversation thread between the user and the other person
export interface MessageThread {
  threadId: string; // Unique identifier for the thread (e.g., based on the other person)
  otherPerson: string; // The name of the other person in the conversation
  messages: Message[]; // Array of messages exchanged between the user and the other person
}
