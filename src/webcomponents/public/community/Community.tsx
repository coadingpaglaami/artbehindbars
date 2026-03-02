"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchBar } from "@/webcomponents/reusable";
import { Clock, Filter, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { CreatePost } from "./CreatePost";
import { CommunityDiscussion } from "./CommunityDiscussion";
import { CommunityGuideLine } from "./GuideLine";
import { isClientAuthenticated } from "@/lib/auth-client";
import { PopularTagsInfinite } from "./PopulerTags";
import {
  useGetAllInfinitePosts,
  useInfiniteCategories,
  useInfiniteStates,
} from "@/api/post";
import { CommunityPosts } from "./post/CommunityPosts";
import { PostsProvider } from "@/context/PostContext";

export const Community = () => {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const isAuthenticated = isClientAuthenticated();
  const limit = 10;

  // Fetch states
  const states = useInfiniteStates(20);
  const {
    data: statesData,
    isLoading: isStatesLoading,
    isFetchingNextPage: isStatesFetchingNextPage,
    hasNextPage: hasStatesNextPage,
    fetchNextPage: fetchStatesNextPage,
  } = states;

  // Fetch categories
  const categories = useInfiniteCategories(limit);
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isFetchingNextPage: isCategoriesFetchingNextPage,
    hasNextPage: hasCategoriesNextPage,
    fetchNextPage: fetchCategoriesNextPage,
    isError: isCategoriesError,
    error,
  } = categories;

  // Fetch posts with filters
  const {
    data: postData,
    fetchNextPage: fetchPostsNextPage,
    hasNextPage: hasPostsNextPage,
    isFetchingNextPage: isFetchingNextPagePosts,
    status: postsStatus,
    isLoading: isPostsLoading,
  } = useGetAllInfinitePosts(
    search,
    selectedState === "All States" ? "" : selectedState,
    selectedTopic,
    sortBy === "popular",
    sortBy === "recent",
    20,
  );

  // Flatten all states from all pages
  const allStates = useMemo(() => {
    return statesData?.pages.flatMap((page) => page.data) || [];
  }, [statesData]);

  // Flatten all posts from all pages
  const allPosts = useMemo(() => {
    return postData?.pages.flatMap((page) => page.data) || [];
  }, [postData]);

  // Handle state dropdown scroll
  const handleStateScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (hasStatesNextPage && !isStatesFetchingNextPage) {
        fetchStatesNextPage();
      }
    }
  };

  // Handle posts scroll (for infinite scroll)
  const handlePostsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      if (hasPostsNextPage && !isFetchingNextPagePosts) {
        fetchPostsNextPage();
      }
    }
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
  };

  const handleSortChange = (sort: "recent" | "popular") => {
    setSortBy(sort);
  };

  return (
    <PostsProvider>
      <div className="py-16 flex flex-col gap-6 lg:px-8 px-4">
        <div className="flex flex-col gap-2">
          <h2 className="md:text-4xl text-2xl font-semibold">
            Prison Reform Community
          </h2>
          <span className="text-[#525252]">
            Discuss prison news, updates, and advocacy for reform. Connect with
            others passionate about change.
          </span>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-2.5 p-2.5 border border-gray-200 rounded-lg shadow-md">
          <SearchBar
            placeholder="Search posts by topic, member, or keyword..."
            value={search}
            onChange={setSearch}
            className="bg-transparent shadow-none"
          />
          <div className="flex flex-col gap-1.5 md:flex-row md:items-stretch">
            {/* State Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex-1 p-2.5 border border-gray-300 rounded-md flex w-full items-center gap-1.5 text-gray-700 hover:bg-gray-50 transition-colors">
                  <Filter size={18} />
                  <span className="truncate">
                    {selectedState === "All States"
                      ? "All States"
                      : allStates.find((s) => s.id === selectedState)?.name ||
                        selectedState}
                  </span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="max-h-40 min-w-0 w-(--radix-dropdown-menu-trigger-width) overflow-y-auto bg-white py-2.5"
                onScroll={handleStateScroll}
              >
                {isStatesLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
                  </div>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => handleStateSelect("All States")}
                      className={
                        selectedState === "All States"
                          ? "bg-blue-50 text-blue-600"
                          : ""
                      }
                    >
                      All States
                    </DropdownMenuItem>

                    {allStates.map((state) => (
                      <DropdownMenuItem
                        key={state.id}
                        onClick={() => handleStateSelect(state.id)}
                        className={
                          selectedState === state.id
                            ? "bg-blue-50 text-blue-600"
                            : ""
                        }
                      >
                        {state.name}
                      </DropdownMenuItem>
                    ))}

                    {isStatesFetchingNextPage && (
                      <div className="flex justify-center items-center py-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
                      </div>
                    )}

                    {!hasStatesNextPage && allStates.length > 0 && (
                      <div className="text-xs text-gray-400 text-center py-2">
                        No more states
                      </div>
                    )}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort Buttons */}
            <Button
              className={`h-full p-2.5 ${sortBy === "recent" ? "" : "bg-[#F5F5F5] text-black"}`}
              variant={sortBy === "recent" ? "default" : "ghost"}
              onClick={() => handleSortChange("recent")}
            >
              <Clock size={18} /> Recent
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "ghost"}
              className={`h-full p-2.5 ${sortBy === "popular" ? "" : "text-black bg-[#F5F5F5]"}`}
              onClick={() => handleSortChange("popular")}
            >
              <TrendingUp size={18} /> Popular
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:items-start lg:flex-row gap-3">
          {/* Posts Section */}
          <div className="lg:w-[70%] flex flex-col gap-4">
            {/* Posts Count */}
            {!isPostsLoading && (
              <span className="text-gray-600">
                Showing {allPosts.length} posts
              </span>
            )}

            {/* Loading State */}
            {isPostsLoading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
              </div>
            )}

            {/* Error State */}
            {postsStatus === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                Failed to load posts. Please try again later.
              </div>
            )}

            {/* Posts List */}
            {!isPostsLoading && postsStatus === "success" && (
              <>
                {allPosts.length > 0 ? (
                  <div
                    className="flex flex-col gap-4"
                    onScroll={handlePostsScroll}
                  >
                    {allPosts.map((post) => (
                      <CommunityPosts
                        key={post.id}
                        community={post}
                
                      />
                    ))}

                    {/* Load More Indicator */}
                    {isFetchingNextPagePosts && (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                      </div>
                    )}

                    {/* Load More Button */}
                    {hasPostsNextPage && !isFetchingNextPagePosts && (
                      <Button
                        onClick={() => fetchPostsNextPage()}
                        variant="outline"
                        className="w-full"
                      >
                        Load More Posts
                      </Button>
                    )}

                    {/* No More Posts */}
                    {!hasPostsNextPage && allPosts.length > 0 && (
                      <div className="text-center text-gray-500 py-4">
                        No more posts to load
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-600">
                      No posts found. Try adjusting your filters.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-[30%] flex flex-col gap-4">
            {isAuthenticated ? (
              <CreatePost categories={categories} states={states} />
            ) : (
              <CommunityDiscussion />
            )}
            <CommunityGuideLine />
            <PopularTagsInfinite
              data={categoriesData}
              isLoading={isCategoriesLoading}
              isFetchingNextPage={isCategoriesFetchingNextPage}
              hasNextPage={hasCategoriesNextPage}
              isError={isCategoriesError}
              error={error}
              fetchNextPage={fetchCategoriesNextPage}
              selectedTopic={selectedTopic}
              setSelectedTopicId={setSelectedTopic}
            />
          </div>
        </div>
      </div>
    </PostsProvider>
  );
};
