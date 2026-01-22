"use client";

import { ForumPost } from "@/interface/admin/forum";
import { Trash2, UserX, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ForumDataProps {
  posts: ForumPost[];
  onDelete: (postId: string) => void;
  onBanAndDelete: (postId: string) => void;
}

export const ForumData = ({
  posts,
  onDelete,
  onBanAndDelete,
}: ForumDataProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4">
      {posts.map((post,index) => (
        <div
          key={post.postId}
          className={"bg-white rounded-lg shadow-md p-6 flex justify-between items-start gap-6"+` ${index+1%2===0?"border border-red-500":""}`}
        >
          {/* Left Content */}
          <div className="flex-1 flex items-start gap-2">
            {/* Title */}
            <div className="space-y-2 flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">
                {post.title}
              </h3>

              {/* Author and Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{post.author}</span>
                <span>•</span>
                <span>{formatDate(post.date)}</span>
              </div>

              {/* Body */}
              <p className="text-gray-700 line-clamp-2">{post.body}</p>
            </div>
            {/* Reports (if greater than 0) */}
            {post.reports > 0 && (
              <div className="flex items-start gap-2 text-orange-600 pt-2">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <span className="text-sm font-medium">
                  {post.reports} {post.reports === 1 ? "report" : "reports"}
                </span>
              </div>
            )}
          </div>

          {/* Right Content - Actions */}
          <div className="flex flex-row items-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(post.postId)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-300"
            >
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBanAndDelete(post.postId)}
              className="text-white  bg-red-600"
            >
              <UserX size={16} className="mr-2" />
              Ban & Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
