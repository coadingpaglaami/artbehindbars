import { FanMailInterface } from "@/interface/admin/fanMail";

// Helper function to generate random status
function getRandomStatus(): "Unread" | "Read" {
  const statuses: ("Unread" | "Read")[] = ["Unread", "Read"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random date within a given range
function getRandomDate(start: Date, end: Date): string {
  const randomTime =
    start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split("T")[0]; // Return date in 'YYYY-MM-DD' format
}

// Function to generate random message data
export function generateMessageData(length: number): FanMailInterface[] {
  const senders = [
    "Alice Walker",
    "Bob Miller",
    "Sarah Brown",
    "Tom Green",
    "Emily White",
  ];
  const recipients = [
    "John Doe",
    "Michael Smith",
    "Sarah Jones",
    "David Wilson",
    "Robert Brown",
  ];
  const subjects = [
    "Love your latest work",
    "Commission request",
    "Question about your latest piece",
    "Inquiry about custom work",
    "Exhibition collaboration proposal",
  ];
  const bodies = [
    "Hi, I just wanted to say that your latest piece really spoke to me. Keep up the great work!",
    "Would you be open to doing a custom portrait? I'd love to work with you.",
    "I saw your latest artwork and was amazed. Would love to discuss potential collaboration.",
    "I'm really interested in your style and would like to discuss some commissioned work.",
    "Your recent exhibit was fantastic! I wanted to ask if you'd be interested in an upcoming exhibition.",
  ];

  const messages: FanMailInterface[] = [];
  const startDate = new Date(2023, 0, 1); // January 1st, 2023
  const endDate = new Date(); // Current date

  for (let i = 0; i < length; i++) {
    const messageId = (i + 1).toString();
    const from = senders[Math.floor(Math.random() * senders.length)];
    const to = recipients[Math.floor(Math.random() * recipients.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const body = bodies[Math.floor(Math.random() * bodies.length)];
    const date = getRandomDate(startDate, endDate);
    const status = getRandomStatus();

    messages.push({
      messageId,
      from,
      to,
      subject,
      body,
      date,
      status,
    });
  }

  return messages;
}
