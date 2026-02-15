"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentResponse } from "@/types/post.type";
import { useCreateComment } from "@/api/post";
import { usePosts } from "@/context/PostContext";


interface CommentSectionProps {
  comments: CommentResponse[];
  postId: string;
  isLoading?: boolean;
}

export const CommentSection = ({
  comments,
  postId,
  isLoading,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
    const { refreshPost } = usePosts();


  const { mutate: createCommentMutate, isPending: isCreatingComment } =
    useCreateComment();

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInMs = now.getTime() - posted.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const handleCreateComment = () => {
    if (!newComment.trim()) return;

    createCommentMutate(
      {
        postId,
        payload: { content: newComment },
      },
      {
        onSuccess: () => {
          setNewComment("");
          refreshPost(postId);
        },
      }
    );
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    createCommentMutate(
      {
        postId,
        payload: { content: replyContent, parentId: commentId },
      },
      {
        onSuccess: () => {
          setReplyContent("");
          setReplyTo(null);
          refreshPost(postId);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Add Comment Input */}
      <div className="flex gap-2">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 min-h-15"
          disabled={isCreatingComment}
        />
        <Button
          onClick={handleCreateComment}
          disabled={!newComment.trim() || isCreatingComment}
          className="self-end"
        >
          {isCreatingComment ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-2">
            {/* Main Comment */}
            <div className="flex gap-3">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {comment.user.firstName?.[0] || comment.user.email?.[0] || "U"}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="font-medium text-sm text-gray-900">
                    {comment.user.firstName && comment.user.lastName
                      ? `${comment.user.firstName} ${comment.user.lastName}`
                      : comment.user.email}
                  </div>
                  <p className="text-sm text-gray-700 mt-1">
                    {comment.content}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  <span>{getTimeAgo(comment.createdAt)}</span>
                  <button
                    onClick={() => setReplyTo(comment.id)}
                    className="font-medium hover:underline"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply Input */}
                {replyTo === comment.id && (
                  <div className="flex gap-2 mt-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="flex-1 min-h-12.5 text-sm"
                      disabled={isCreatingComment}
                    />
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        onClick={() => handleReply(comment.id)}
                        disabled={!replyContent.trim() || isCreatingComment}
                      >
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setReplyTo(null);
                          setReplyContent("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-4 mt-2 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <div className="shrink-0">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              {reply.user.firstName?.[0] ||
                                reply.user.email?.[0] ||
                                "U"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-2">
                            <div className="font-medium text-xs text-gray-900">
                              {reply.user.firstName && reply.user.lastName
                                ? `${reply.user.firstName} ${reply.user.lastName}`
                                : reply.user.email}
                            </div>
                            <p className="text-xs text-gray-700 mt-1">
                              {reply.content}
                            </p>
                          </div>
                          <span className="text-xs text-gray-600 mt-1 inline-block">
                            {getTimeAgo(reply.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};