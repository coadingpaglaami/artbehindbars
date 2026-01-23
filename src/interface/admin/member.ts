export interface Member {
  memberId: string; // Unique identifier for the member
  name: string; // Name of the member
  email: string; // Email of the member
  joinedDate: string; // Date when the member joined (in YYYY-MM-DD format)
  activityScore: number; // Activity score of the member
  status: "Active" | "Suspended" | "Banned"; // Status of the member
}