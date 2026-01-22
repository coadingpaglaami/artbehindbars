
export interface Notification {
  notificationId: string; // Unique identifier for the notification
  title: string; // Title of the notification (e.g., "New Bid Placed", "Artwork Uploaded")
  description: string; // Description of the notification (e.g., "ArtCollector99 placed a bid of $150 on 'Desert Solitude'")
  timestamp: string; // Time when the notification was created (e.g., '6h ago')
  type:
    | "New Bid Placed"
    | "Artwork Uploaded"
    | "New Fan Mail"
    | "New Member Registration"
    | "Auction Ending Soon"
    | "System Update"
    | "Artwork Sold"
    | "Message Forwarded"; // Type of notification
  status: "Unread" | "Read"; // Status of the notification
}