"use client";


import { Trash2, UserX, Flag, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportedPost } from "@/types/post.type";

interface ForumDataProps {
  posts: ReportedPost[];
  onDeletePost: (postId: string) => void;
  onViewReports: (post: ReportedPost) => void;
  onWarnUser: (userId: string, userName: string) => void;
  onSuspendUser: (userId: string, userName: string) => void;
  isDeleting?: boolean;
  isWarnLoading?: boolean;
  isSuspendLoading?: boolean;
}

export const ForumData = ({
  posts,
  onDeletePost,
  onViewReports,
  onWarnUser,
  onSuspendUser,
  isDeleting,
  isWarnLoading,
  isSuspendLoading,
}: ForumDataProps) => {
  const getSeverityColor = (reportCount: number) => {
    if (reportCount >= 10) return "border-red-600 bg-red-50";
    if (reportCount >= 5) return "border-orange-500 bg-orange-50";
    if (reportCount >= 3) return "border-yellow-500 bg-yellow-50";
    return "";
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const severityClass = getSeverityColor(post.reportCount);
        
        return (
          <div
            key={post.postId}
            className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
              severityClass ? `border-l-4 ${severityClass}` : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              {/* Left Content */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.title}
                  </h3>
                  
                  {/* Report Count Badge */}
                  {post.reportCount >= 3 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                      <AlertCircle size={12} />
                      {post.reportCount} reports
                    </span>
                  )}
                </div>

                {/* Author and Metadata */}
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {post.userName}
                  </span>
                  <span>•</span>
                  <span>ID: {post.userId.slice(0, 8)}...</span>
                </div>

                {/* Content */}
                <p className="text-gray-700 line-clamp-3">{post.content}</p>

                {/* Reports Summary */}
                {post.reports && post.reports.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.reports.slice(0, 3).map((report, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        <Flag size={10} />
                        {report.reason.replace(/_/g, " ")}
                      </span>
                    ))}
                    {post.reports.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{post.reports.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Right Content - Actions */}
              <div className="flex flex-row items-start gap-2 lg:flex-col lg:items-stretch">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewReports(post)}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-300"
                >
                  <Flag size={16} className="mr-2" />
                  View Reports ({post.reportCount})
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onWarnUser(post.userId, post.userName)}
                  disabled={isWarnLoading}
                  className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 border-yellow-300"
                >
                  <MessageSquare size={16} className="mr-2" />
                  {isWarnLoading ? "Warning..." : "Warn User"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSuspendUser(post.userId, post.userName)}
                  disabled={isSuspendLoading}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 border-orange-300"
                >
                  <UserX size={16} className="mr-2" />
                  {isSuspendLoading ? "Suspending..." : "Suspend User"}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeletePost(post.postId)}
                  disabled={isDeleting}
                >
                  <Trash2 size={16} className="mr-2" />
                  {isDeleting ? "Deleting..." : "Delete Post"}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};