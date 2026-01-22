"use client";

import { useState } from "react";
import { generatePostData } from "@/data/admin/forumPostData";
import { ForumPost } from "@/interface/admin/forum";
import { AdminHeading } from "@/webcomponents/reusable";
import { ForumData } from "./ForumData";
import { Pagination } from "@/webcomponents/reusable";

export const ConnectForum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const forumData: ForumPost[] = generatePostData(50);

  // Filter posts based on status

  // Pagination
  const totalPages = Math.ceil(forumData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = forumData.slice(startIndex, endIndex);

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
          <p className="text-gray-600">There are no posts in this category.</p>
        </div>
      )}
    </div>
  );
};
