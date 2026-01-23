export interface CommunityPost {
  postId: string; // Unique identifier for the post
  authorName: string; // Name of the post author
  postedOn: string; // Date when the post was made
  content: string; // Content of the post
  state: string; // State associated with the post
  topics: string;
  likes: number; // Number of likes the post has received
  comments: number; // Number of comments on the post
  postTitle: string;
  postImage?: string[]; // Optional image associated with the post
  postVideo?: string; // Optional video associated with the post
}
