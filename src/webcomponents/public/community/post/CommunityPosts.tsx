/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetComments, useToggleLike } from "@/api/post";
import { PostResponse } from "@/types/post.type";
import { CommentSection } from "./CommentSection";
import { ReportDialog } from "./ReportDialogue";
import { PostDetailDialog } from "./PostDetailDialogue";
import { usePosts } from "@/context/PostContext";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useAuth } from "@/api/auth";


export const CommunityPosts = ({ community }: { community: PostResponse }) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isPostDetailOpen, setIsPostDetailOpen] = useState(false);
  const { refreshPost } = usePosts();
  const { isAuthenticated } = useAuth();

  // Mutations and Queries
  const { mutate: toggleLikeMutate, isPending: isTogglingLike } =
    useToggleLike();
  const { data: commentsData, isLoading: isLoadingComments } = useGetComments(
    community.id,
  );

  // Calculate time ago from posted date
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

  // Handle like toggle
  const handleLike = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isAuthenticated     ? toggleLike()
      : toast.error("You need to be logged in to like posts.");
  };

  const toggleLike = () => {
    toggleLikeMutate(community.id, {
      onSuccess: () => {
        refreshPost(community.id); // Optimistically update UI or refetch
        toast.success(community.isLiked ? "Like removed" : "Post liked!");
        // Optimistically update UI or refetch
      },
      onError:(error) => {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    });
  };

  // Render images based on count
const renderImages = () => {
  const hasImages = community.imageUrl && community.imageUrl.length > 0;
  const hasVideo = community.videoUrl;

  if (!hasImages && !hasVideo) return null;

  const imageCount = community.imageUrl?.length || 0;

  // Helper to render video
  const renderVideo = () => {
    if (!hasVideo) return null;
    
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <video
          src={community.videoUrl}
          controls
          className="w-full h-full object-cover"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };

  // Only video, no images
  if (!hasImages && hasVideo) {
    return renderVideo();
  }

  // Single image
  if (imageCount === 1) {
    return (
      <div className="space-y-2">
        <div className="relative w-full aspect-[4/1.3] rounded-lg overflow-hidden">
          <Image
            src={hasImages ? (community.imageUrl ?? [])[0] : ""}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
        {renderVideo()}
      </div>
    );
  }

  // Two images
  if (imageCount === 2) {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {hasImages && community.imageUrl?.map((img, idx) => (
            <div
              key={idx}
              className="relative h-48 rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                alt={`Post image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {renderVideo()}
      </div>
    );
  }

  // Three images
  if (imageCount === 3) {
    return (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {(community?.imageUrl ?? []).slice(0, 2).map((img, idx) => (
            <div
              key={idx}
              className="relative h-48 rounded-lg overflow-hidden"
            >
              <Image
                src={img}
                alt={`Post image ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
          <div className="relative h-48 rounded-lg overflow-hidden col-span-2">
            <Image
              src={hasImages && (community.imageUrl?.length ?? 0) > 2 ? (community.imageUrl?.[2] ?? "") : ""}
              alt="Post image 3"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {renderVideo()}
      </div>
    );
  }

  // Four or more images
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {(community?.imageUrl ?? []).slice(0, 3).map((img, idx) => (
          <div
            key={idx}
            className={`relative h-48 rounded-lg overflow-hidden ${
              idx === 2 ? "col-span-2" : ""
            }`}
          >
            <Image
              src={img}
              alt={`Post image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {imageCount > 3 && (
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={hasImages && (community.imageUrl?.length ?? 0) > 3 ? community.imageUrl?.[3] ?? "" : ""}
              alt="Post image 4"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                +{imageCount - 3}
              </span>
            </div>
          </div>
        )}
      </div>
      {renderVideo()}
    </div>
  );
};

  const recentComments = commentsData?.slice(0, 2) || [];
  const hasMoreComments = (commentsData?.length || 0) > 2;

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
        {/* Header with Tags and More Button */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              {community.state.name}
            </span>
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#DBEAFE", color: "#193CB8" }}
            >
              {community.topic.name}
            </span>
          </div>

          {/* More Options Dropdown */}
          {isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={18} className="text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsReportDialogOpen(true)}>
                  Report Post
                </DropdownMenuItem>
                {/* Future options can be added here */}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Post Title */}
        <h3 className="text-xl font-semibold text-gray-900">
          {community.title}
        </h3>

        {/* Author and Posted Time */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link
            href={`/profile/${community.user.id}`}
            className="font-medium hover:underline"
          >
            {community.user.firstName && community.user.lastName
              ? `${community.user.firstName} ${community.user.lastName}`
              : community.user.email}
          </Link>
          <span>•</span>
          <span>{getTimeAgo(community.createdAt)}</span>
        </div>

        {/* Content */}
        <p className="text-gray-700 leading-relaxed">{community.content}</p>

        {/* Images */}
        {renderImages()}

        {/* Divider */}
        <div className="border-b border-gray-300"></div>

        {/* Likes and Comments */}
        <div className="flex items-center gap-6 text-gray-600">
          <button
            onClick={handleLike}
            disabled={isTogglingLike}
            className={`flex items-center gap-2 cursor-pointer transition-colors ${
              community.isLiked ? "text-red-500" : "hover:text-red-500"
            } disabled:opacity-50`}
          >
            <Heart
              size={20}
              fill={community.isLiked ? "currentColor" : "none"}
            />
            <span className="text-sm font-medium">
              {community._count.likes}
            </span>
          </button>
          <button
            onClick={() => {isAuthenticated ? setIsPostDetailOpen(true): toast.error("You need to be logged in to view comments.")}}
            className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors"
          >
            <MessageCircle size={20} />
            <span className="text-sm font-medium">
              {community._count.comments}
            </span>
          </button>
        </div>

        {/* Recent Comments Section */}
        {recentComments.length > 0 && (
          <>
            <div className="border-b border-gray-300"></div>
            <CommentSection
              comments={recentComments}
              postId={community.id}
              isLoading={isLoadingComments}
            />
          </>
        )}

        {/* Show More Comments Button */}
        {hasMoreComments && (
          <Button
            variant="ghost"
            className="w-full text-primary"
            onClick={() => setIsPostDetailOpen(true)}
          >
            View all {community._count.comments} comments
          </Button>
        )}
      </div>

      {/* Report Dialog */}
      <ReportDialog
        isOpen={isReportDialogOpen}
        onClose={() => setIsReportDialogOpen(false)}
        postId={community.id}
      />

      {/* Post Detail Dialog */}
      <PostDetailDialog
        isOpen={isPostDetailOpen}
        onClose={() => setIsPostDetailOpen(false)}
        post={community}
      />
    </>
  );
};
