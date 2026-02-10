"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { communityPosts } from "@/data/communitydata";
import { SearchBar } from "@/webcomponents/reusable";
import { Clock, Filter, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { CommunityPosts } from "./CommunityPosts";
import { CreatePost } from "./CreatePost";
import { CommunityDiscussion } from "./CommunityDiscussion";
import { CommunityGuideLine } from "./GuideLine";
import { PopularTags } from "./PopulerTags";
import { isClientAuthenticated } from "@/lib/auth-client";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export const Community = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");
  const isAuthenticated = isClientAuthenticated();

  // Filter and sort community posts
  const filteredPosts = useMemo(() => {
    let filtered = [...communityPosts];

    // Filter by search
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.postTitle.toLowerCase().includes(searchLower) ||
          post.content.toLowerCase().includes(searchLower) ||
          post.topics.toLowerCase().includes(searchLower) ||
          post.authorName.toLowerCase().includes(searchLower),
      );
    }

    // Filter by state
    if (selectedState !== "All States") {
      filtered = filtered.filter((post) => post.state === selectedState);
    }

    // Sort by recent or popular
    if (sortBy === "recent") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.postedOn).getTime();
        const dateB = new Date(b.postedOn).getTime();
        return dateB - dateA; // Most recent first
      });
    } else if (sortBy === "popular") {
      filtered.sort((a, b) => {
        // Sort by likes + comments (engagement)
        const engagementA = a.likes + a.comments;
        const engagementB = b.likes + b.comments;
        return engagementB - engagementA; // Most popular first
      });
    }

    return filtered;
  }, [search, selectedState, sortBy]);

  return (
    <div className="py-16 flex flex-col gap-6 lg:px-8 px-4">
      <div className="flex flex-col gap-2">
        <h2 className="md:text-4xl text-2xl font-semibold ">
          Prison Reform Community
        </h2>
        <span className="text-[#525252]">
          Discuss prison news, updates, and advocacy for reform. Connect with
          others passionate about change.
        </span>
      </div>
      <div className="flex flex-col gap-2.5 p-2.5 border border-gray-200 rounded-lg shadow-md">
        <SearchBar
          placeholder="Search posts by topic, member, or keyword..."
          value={search}
          onChange={setSearch}
          className="bg-transparent shadow-none"
        />
        <div className="flex flex-col gap-1.5 md:flex-row md:items-stretch ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex-1 p-2.5 border border-gray-300 rounded-md flex w-full items-center gap-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span>{selectedState}</span>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="max-h-40 min-w-0 w-(--radix-dropdown-menu-trigger-width) overflow-y-auto bg-white py-2.5"
            >
              <DropdownMenuItem onClick={() => setSelectedState("All States")}>
                All States
              </DropdownMenuItem>
              {states.map((state) => (
                <DropdownMenuItem
                  key={state}
                  onClick={() => setSelectedState(state)}
                >
                  {state}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="h-full p-2.5 ">
            <Clock size={18} /> Recent
          </Button>
          <Button
            variant={"ghost"}
            className="h-full p-2.5  text-black bg-[#F5F5F5]"
          >
            <TrendingUp size={18} /> Popular
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:items-start lg:flex-row gap-3 ">
        <div className="lg:w-[70%] flex-col ">
          <span>Showing {filteredPosts.length} posts</span>
          <div className="flex flex-col gap-4">
            {filteredPosts.map((post, index) => (
              <CommunityPosts
                key={post.postId}
                community={post}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="lg:w-[30%] flex flex-col gap-4">
          {isAuthenticated ? <CreatePost /> : <CommunityDiscussion />}
          <CommunityGuideLine />
          <PopularTags />
        </div>
      </div>
    </div>
  );
};
