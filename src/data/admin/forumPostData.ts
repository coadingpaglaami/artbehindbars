import { ForumPost } from "@/interface/admin/forum";

// Helper function to generate random number of reports
function getRandomReports(): number {
  return Math.floor(Math.random() * 10); // Random reports between 0 and 9
}

// Helper function to generate random status
function getRandomStatus(): "Active" | "Inappropriate" {
  const statuses: ("Active" | "Inappropriate")[] = ["Active", "Inappropriate"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Function to generate random post data
export function generatePostData(length: number): ForumPost[] {
  const titles = [
    "How to support incarcerated artists?", 
    "Inappropriate Content", 
    "Art supplies donation"
  ];
  
  const authors = ["Alice Walker", "Trouble Maker", "Bob Miller"];
  const bodies = [
    "I am looking for more ways to help...",
    "This is a spam post...",
    "Does anyone know where to donate supplies?"
  ];

  const posts: ForumPost[] = [];

  for (let i = 0; i < length; i++) {
    const postId = (i + 1).toString();
    const title = titles[Math.floor(Math.random() * titles.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    const body = bodies[Math.floor(Math.random() * bodies.length)];
    const date = new Date().toISOString().split("T")[0]; // Today's date
    const status = getRandomStatus();
    const reports = status === "Inappropriate" ? getRandomReports() : 0; // Only inappropriate posts have reports

    posts.push({
      postId,
      title,
      author,
      date,
      body,
      status,
      reports,
    });
  }

  return posts;
}

// Example usage
const generatedPosts = generatePostData(3); // Generate 3 posts
console.log(generatedPosts);
