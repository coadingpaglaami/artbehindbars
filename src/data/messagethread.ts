import { Message, MessageThread } from "@/interface/messagethread";

// Helper function to generate random status
function getRandomStatus(): "Read" | "Unread" {
  const statuses: ("Read" | "Unread")[] = ["Read", "Unread"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random timestamp (e.g., "2023-10-24")
function getRandomTimestamp(): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date within the last 30 days
  return date.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
}

// Function to generate random message data
export function generateMessageThreads(length: number): MessageThread[] {
  const otherPeople = [
    "Alice Walker",
    "Bob Miller",
    "Charlie Davis",
    "Sarah Jones",
  ];
  const messages = [
    "Hey, how are you doing?",
    "I loved your latest work, would you be interested in collaborating?",
    "What are your thoughts on the upcoming exhibit?",
    "Can we discuss the commission details for your next piece?",
    "I'm really inspired by your style. Any tips for a budding artist?",
  ];

  const messageThreads: MessageThread[] = [];

  for (let i = 0; i < length; i++) {
    const threadId = (i + 1).toString();
    const otherPerson =
      otherPeople[Math.floor(Math.random() * otherPeople.length)];
    const messagesArray: Message[] = [];

    // Each conversation has at least 5 messages
    for (let j = 0; j < 5 + Math.floor(Math.random() * 5); j++) {
      const from = j % 2 === 0 ? "user" : otherPerson; // Alternate between user and the other person
      const body = messages[Math.floor(Math.random() * messages.length)];
      const timestamp = getRandomTimestamp();
      const status = getRandomStatus();

      messagesArray.push({
        messageId: `${threadId}-${j + 1}`,
        from,
        body,
        timestamp,
        status,
      });
    }

    messageThreads.push({
      threadId,
      otherPerson,
      messages: messagesArray,
    });
  }

  return messageThreads;
}


export const mockThreads: MessageThread[] = generateMessageThreads(20);