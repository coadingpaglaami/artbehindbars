import { Member } from "@/interface/admin";

// Helper function to generate random activity score
function getRandomActivityScore(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to generate random status
function getRandomStatus(): "Active" | "Suspended" | "Banned" {
  const statuses: ("Active" | "Suspended" | "Banned")[] = ["Active", "Suspended", "Banned"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Helper function to generate random date (within a specific range)
function getRandomDate(start: Date, end: Date): string {
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split("T")[0]; // Return date in 'YYYY-MM-DD' format
}

// Function to generate random member data
export function generateMemberData(length: number): Member[] {
  const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Grace", "Hank", "Ivy", "Jack", "Kim"];
  const lastNames = ["Walker", "Miller", "Davis", "Brown", "Smith", "Taylor", "Lee", "Wilson", "Clark", "Moore"];
  const domains = ["example.com", "test.com", "demo.com", "sample.com", "mail.com"];

  const members: Member[] = [];
  const startDate = new Date(2022, 0, 1); // Starting from January 1st, 2022
  const endDate = new Date(); // Current date

  for (let i = 0; i < length; i++) {
    const memberId = (i + 1).toString();
    const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const email = `${name.toLowerCase().replace(" ", ".")}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const joinedDate = getRandomDate(startDate, endDate); // Random joined date
    const activityScore = getRandomActivityScore(10, 100); // Random activity score between 10 and 100
    const status = getRandomStatus(); // Random status

    members.push({
      memberId,
      name,
      email,
      joinedDate,
      activityScore,
      status,
    });
  }

  return members;
}
