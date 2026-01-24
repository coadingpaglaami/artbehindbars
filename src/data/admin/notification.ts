import { Notification } from "@/interface/admin";

// Helper function to generate random status
function getRandomStatus(): "Unread" | "Read" {
  const statuses: ("Unread" | "Read")[] = ["Unread", "Read"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random timestamp (e.g., "6h ago", "1 day ago")
function getRandomTimestamp(): string {
  const hours = Math.floor(Math.random() * 24); // Random number between 0 and 24
  const minutes = Math.floor(Math.random() * 60); // Random number between 0 and 59
  if (hours < 1) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    return `${Math.floor(hours / 24)} day${Math.floor(hours / 24) > 1 ? 's' : ''} ago`;
  }
}

// Function to generate random notification data
export function generateNotificationData(length: number): Notification[] {
  const titles = [
    "New Bid Placed",
    "Artwork Uploaded",
    "New Fan Mail",
    "New Member Registration",
    "Auction Ending Soon",
    "System Update",
    "Artwork Sold",
    "Message Forwarded"
  ];

  const descriptions = [
    'ArtCollector99 placed a bid of $150 on "Desert Solitude"',
    'John Doe uploaded a new artwork "Freedom of Mind"',
    'Alice Walker sent a message to Sarah Jones',
    'Bob Miller joined the platform',
    'Auction for "Silent Night" ends in 2 hours',
    'Platform maintenance scheduled for tonight at 2 AM',
    '"Hope" by Sarah Jones was sold for $300',
    'Fan mail successfully forwarded to Michael Smith'
  ];

  // Mapping titles to notification types
  const titleToTypeMap: { [key: string]: "New Bid Placed" | "Artwork Uploaded" | "New Fan Mail" | "New Member Registration" | "Auction Ending Soon" | "System Update" | "Artwork Sold" | "Message Forwarded" } = {
    "New Bid Placed": "New Bid Placed",
    "Artwork Uploaded": "Artwork Uploaded",
    "New Fan Mail": "New Fan Mail",
    "New Member Registration": "New Member Registration",
    "Auction Ending Soon": "Auction Ending Soon",
    "System Update": "System Update",
    "Artwork Sold": "Artwork Sold",
    "Message Forwarded": "Message Forwarded"
  };

  const notifications: Notification[] = [];

  for (let i = 0; i < length; i++) {
    const notificationId = (i + 1).toString();
    const title = titles[Math.floor(Math.random() * titles.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const timestamp = getRandomTimestamp(); // Random timestamp
    const status = getRandomStatus(); // Random status (Unread or Read)
    const type = titleToTypeMap[title]; // Map title to type

    notifications.push({
      notificationId,
      title,
      description,
      timestamp,
      type, // Add the type field
      status
    });
  }

  return notifications;
}
