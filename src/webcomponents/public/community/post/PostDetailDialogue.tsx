"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Heart, MessageCircle} from "lucide-react";
import Image from "next/image";

import { CommentSection } from "./CommentSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PostResponse } from "@/types/post.type";
import { useGetComments, useToggleLike } from "@/api/post";

interface PostDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostResponse;
}

export const PostDetailDialog = ({
  isOpen,
  onClose,
  post,
}: PostDetailDialogProps) => {
  const { data: commentsData, isLoading: isLoadingComments } = useGetComments(
    post.id
  );
  const { mutate: toggleLikeMutate, isPending: isTogglingLike } =
    useToggleLike();

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInMs = now.getTime() - posted.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
    if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return "Just now";
  };

  const handleLike = () => {
    toggleLikeMutate(post.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" h-[70vh] p-0 overflow-hidden" style={{
        maxWidth:"stretch"
      }}>
        <div className="flex h-full">
          {/* Left Side - Images */}
          {post.imageUrl && post.imageUrl.length > 0 && (
            <div className="w-1/2 bg-black relative">
              <div className="relative h-full">
                <Image
                  src={post.imageUrl[0]}
                  alt={post.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          )}

          {/* Right Side - Post Details and Comments */}
          <div
            className={`${post.imageUrl && post.imageUrl.length > 0 ? "w-1/2" : "w-full"} flex flex-col`}
          >
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {post.user.firstName?.[0] || post.user.email?.[0] || "U"}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {post.user.firstName && post.user.lastName
                        ? `${post.user.firstName} ${post.user.lastName}`
                        : post.user.email}
                    </div>
                    <div className="text-sm text-gray-600">
                      {getTimeAgo(post.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  {post.state.name}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: "#DBEAFE", color: "#193CB8" }}
                >
                  {post.topic.name}
                </span>
              </div>
            </div>

            {/* Post Content */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {/* Title and Content */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Likes and Comments Count */}
                <div className="flex items-center gap-6 py-3 border-y">
                  <button
                    onClick={handleLike}
                    disabled={isTogglingLike}
                    className={`flex items-center gap-2 transition-colors ${
                      post.isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                    } disabled:opacity-50`}
                  >
                    <Heart
                      size={20}
                      fill={post.isLiked ? "currentColor" : "none"}
                    />
                    <span className="text-sm font-medium">
                      {post._count.likes}
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageCircle size={20} />
                    <span className="text-sm font-medium">
                      {post._count.comments}
                    </span>
                  </div>
                </div>

                {/* Comments Section */}
                <CommentSection
                  comments={commentsData || []}
                  postId={post.id}
                  isLoading={isLoadingComments}
                />
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};