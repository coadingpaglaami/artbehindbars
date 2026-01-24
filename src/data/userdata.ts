// lib/mockUsers.ts

import { UserProfile } from "@/interface/user-profile";

export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "SARAH JOHNSON",
    connections: 261,
    headline:
      "Prison reform advocate and art collector. Passionate about second chances and rehabilitation through creative expression.",
    location: "Los Angeles, CA",
    joined: "Joined January 2023",
  },
  {
    id: "2",
    name: "MICHAEL BROWN",
    connections: 184,
    headline:
      "Formerly incarcerated artist using painting and sculpture to share stories of resilience and hope.",
    location: "Brooklyn, NY",
    joined: "Joined March 2022",
  },
  {
    id: "3",
    name: "EMILY CARTER",
    connections: 342,
    headline:
      "Nonprofit director supporting justice-impacted artists and community-driven reform initiatives.",
    location: "Chicago, IL",
    joined: "Joined August 2021",
  },
  {
    id: "4",
    name: "JAMES WILSON",
    connections: 97,
    headline:
      "Illustrator and muralist collaborating with reentry programs to create social impact through art.",
    location: "Oakland, CA",
    joined: "Joined May 2023",
  },
];
