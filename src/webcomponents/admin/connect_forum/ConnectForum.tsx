"use client";

import { useState } from "react";
import { generatePostData } from "@/data/admin/forumPostData";
import { ForumPost } from "@/interface/admin/forum";
import { AdminHeading } from "@/webcomponents/reusable";
import { ForumData } from "./ForumData";
import { Pagination } from "@/webcomponents/reusable";
import { CategoryOrState } from "./CategoryOrState";

export const ConnectForum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
   const [activeTab, setActiveTab] = useState<'categories' | 'states'>('categories');

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
      <div className="bg-white rounded-lg shadow p-6">
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'categories'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Categories
        </button>
        <button
          onClick={() => setActiveTab('states')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'states'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          States
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'categories' ? (
          <CategoryOrState type="category" />
        ) : (
          <CategoryOrState type="state" />
        )}
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
          <p className="text-gray-600">There are no posts in this category.</p>
        </div>
      )}
    </div>
  );
};
