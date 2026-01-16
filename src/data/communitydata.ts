import { CommunityPost } from "@/interface/community";

export const communityPosts: CommunityPost[] = [
  {
    postId: "1",
    authorName: "Legislation",
    postedOn: "2026-01-14",
    content:
      "New legislation proposal in California for prison education programs. The bill seeks to expand educational opportunities in state prisons, providing incarcerated individuals the chance to earn higher education degrees and vocational training. The bill could allocate $30M for vocational testing and college courses. What are your thoughts?",
    state: "California", // matched state
    topics: "Education", // single topic
    likes: 120,
    comments: 50,
    postTitle:
      "New legislation proposal in California for prison education programs",
    postImage: ["/community/post1.jpg"],
  },
  {
    postId: "2",
    authorName: "Prison Reform",
    postedOn: "2026-01-14",
    content:
      "Texas prison conditions - Recent inspection report. The latest research report from Harris County facilities is concerning. Overcrowding has increased 20% and serious health risks are prevalent. There's a new proposal to improve conditions, but how serious are these changes? Thoughts?",
    state: "Texas", // matched state
    topics: "Prison", // single topic
    likes: 200,
    comments: 90,
    postTitle: "Texas prison conditions - Recent inspection report",
    postImage: ["/community/post2.jpg"],
  },
  {
    postId: "3",
    authorName: "Health",
    postedOn: "2026-01-13",
    content:
      "NY expanding video visitation hours - Great news! New York DOC is expanding video visitation hours from 2 hours to 4 hours per week for families. This is a great step towards making communication with loved ones more accessible. Finally some good news!",
    state: "New York", // matched state
    topics: "Visitation", // single topic
    likes: 150,
    comments: 30,
    postTitle: "NY expanding video visitation hours - Great news!",
    postVideo: "/videos/ny-video-visitation.mp4",
  },
  {
    postId: "4",
    authorName: "Health",
    postedOn: "2026-01-12",
    content:
      "Florida mental health services update. Governor recently announced plans to improve mental health services within Florida's prisons. The move is welcomed by many, as mental health support has been a neglected issue. What do you think of this initiative?",
    state: "Florida", // matched state
    topics: "MentalHealth", // single topic
    likes: 180,
    comments: 75,
    postTitle: "Florida mental health services update",
    postImage: ["/community/post4.jpg"],
  },
  {
    postId: "5",
    authorName: "Reform",
    postedOn: "2026-01-10",
    content:
      "Illinois reentry program success stories. The Illinois reentry program has helped numerous individuals reintegrate successfully into society. Many have overcome obstacles and found stable employment. Would love to hear more success stories from other regions.",
    state: "Illinois", // matched state
    topics: "Reentry", // single topic
    likes: 220,
    comments: 80,
    postTitle: "Illinois reentry program success stories",
    postImage: ["/community/post3.jpg"],
  },
  {
    postId: "6",
    authorName: "Legislation",
    postedOn: "2026-01-09",
    content:
      "Washington State passes sentencing reform. Major legislation passed, providing sentencing reform that will reduce mandatory minimums for certain offenses. Do you think this will have a significant impact on the prison population?",
    state: "Washington", // matched state
    topics: "Sentencing", // single topic
    likes: 160,
    comments: 60,
    postTitle: "Washington State passes sentencing reform",
    postImage: ["/community/post4.jpg"],
  },
  {
    postId: "7",
    authorName: "Health",
    postedOn: "2026-01-08",
    content:
      "Tennessee prison healthcare - Medical staff shortage. Reports show that Tennessee prisons are facing a severe shortage of medical staff. This is causing delays in treatment and potentially putting lives at risk. What should be done to improve this?",
    state: "Tennessee", // matched state
    topics: "Healthcare", // single topic
    likes: 130,
    comments: 40,
    postTitle: "Tennessee prison healthcare - Medical staff shortage",
  },
  {
    postId: "8",
    authorName: "Reform",
    postedOn: "2026-01-07",
    content:
      "Georgia prison visitation policies under review. The Georgia Department of Corrections is reviewing its visitation policies due to overcrowding concerns. There's an ongoing debate about the impact on family connections. What are your views on this?",
    state: "Georgia", // matched state
    topics: "Visitation", // single topic
    likes: 110,
    comments: 55,
    postTitle: "Georgia prison visitation policies under review",
  },
  {
    postId: "9",
    authorName: "Legislation",
    postedOn: "2026-01-06",
    content:
      "California bill to improve inmate education funding. California introduces a new bill aimed at increasing funding for inmate education programs. This includes vocational training and college courses. What do you think of this move?",
    state: "California", // matched state
    topics: "Education", // single topic
    likes: 250,
    comments: 120,
    postTitle: "California bill to improve inmate education funding",
    postImage: ["/community/post1.jpg"],
  },
  {
    postId: "10",
    authorName: "Reform",
    postedOn: "2026-01-05",
    content:
      "Michigan's correctional facilities offering new rehabilitation programs. The Michigan Department of Corrections is introducing new rehabilitation programs focusing on drug addiction and mental health. This could be a step forward for successful reintegration. What are your thoughts?",
    state: "Michigan", // matched state
    topics: "Rehabilitation", // single topic
    likes: 170,
    comments: 50,
    postTitle:
      "Michigan's correctional facilities offering new rehabilitation programs",
  },
];
