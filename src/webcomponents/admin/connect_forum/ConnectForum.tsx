"use client";

import { useState, useMemo } from "react";
import { generatePostData } from "@/data/admin/forumPostData";
import { ForumPost } from "@/interface/admin/forum";
import { AdminHeading } from "@/webcomponents/reusable";
import { ForumData } from "./ForumData";
import { Pagination } from "@/webcomponents/reusable";

export const ConnectForum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inappropriate">("all");
  const itemsPerPage = 10;

  const forumData: ForumPost[] = generatePostData(50);

  // Filter posts based on status
  const filteredPosts = useMemo(() => {
    switch (statusFilter) {
      case "all":
        return forumData;
      case "active":
        return forumData.filter((post) => post.status === "Active");
      case "inappropriate":
        return forumData.filter((post) => post.status === "Inappropriate");
      default:
        return forumData;
    }
  }, [statusFilter, forumData]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleDelete = (postId: string) => {
    console.log("Delete post:", postId);
    // Implement delete logic
  };

  const handleBanAndDelete = (postId: string) => {
    console.log("Ban and delete post:", postId);
    // Implement ban and delete logic
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="CONNECT Forum Moderation"
        subheading="Review community discussions and handle reported content."
      />

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setStatusFilter("all");
              setCurrentPage(1);
            }}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              statusFilter === "all"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            All Posts
          </button>
          <button
            onClick={() => {
              setStatusFilter("active");
              setCurrentPage(1);
            }}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              statusFilter === "active"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => {
              setStatusFilter("inappropriate");
              setCurrentPage(1);
            }}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
              statusFilter === "inappropriate"
                ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Flagged
          </button>
        </div>
      </div>

      {/* Forum Posts */}
      <ForumData
        posts={currentPosts}
        onDelete={handleDelete}
        onBanAndDelete={handleBanAndDelete}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {currentPosts.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Posts Found
          </h3>
          <p className="text-gray-600">
            There are no posts in this category.
          </p>
        </div>
      )}
    </div>
  );
};