export interface ForumPost {
  postId: string; // Unique identifier for the post
  title: string; // Title of the post
  author: string; // Author of the post
  date: string; // Date the post was created
  body: string; // Content of the post
  status: "Active" | "Inappropriate"; // Post status (active or flagged as inappropriate)
  reports: number; // Number of reports the post has received (only for inappropriate posts)
}