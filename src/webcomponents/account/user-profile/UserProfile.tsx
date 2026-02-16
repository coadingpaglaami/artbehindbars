// components/UserProfile.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetOtherUserProfile } from "@/api/account";
import {
  useDisconnectConnectionMutation,
  useGetConnectionStatus,
  useSendConnectionRequestMutation,
} from "@/api/connection";
import { useGetInfiniteUserPosts } from "@/api/post";
import { useGetOrCreateChatMutation, useSendMessageMutation } from "@/api/chat";

interface UserProfileProps {
  profileId: string;
}

export const UserProfile = ({ profileId }: UserProfileProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  console.log(profileId);
  // Fetch user profile
  const {
    data: user,
    isLoading: isProfileLoading,
    error: profileError,
  } = useGetOtherUserProfile(profileId);

  // Fetch connection status
  const {
    data: connectionData,
    isLoading: isConnectionStatusLoading,
    refetch: refetchConnectionStatus,
  } = useGetConnectionStatus(profileId);

  // Fetch user posts (recent activity)
  const {
    data: postsData,
    isLoading: isPostsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteUserPosts(profileId, { limit: 3 }); // Limit to 3 for recent activity

  // Mutations
  const sendConnectionRequest = useSendConnectionRequestMutation();
  const disconnectConnection = useDisconnectConnectionMutation();
  const getOrCreateChat = useGetOrCreateChatMutation();
  const sendMessage = useSendMessageMutation();

  // Flatten posts data
  const recentPosts = postsData?.pages.flatMap((page) => page.data) || [];

  // Determine connection button text and state
  const getConnectionButtonProps = () => {
    if (!connectionData) {
      return {
        text: "Connect",
        variant: "default" as const,
        disabled: false,
        onClick: handleConnect,
      };
    }

    const { status, direction } = connectionData;

    if (status === "ACCEPTED") {
      return {
        text: "Connected",
        variant: "outline" as const,
        disabled: false,
        onClick: handleDisconnect,
      };
    }

    if (status === "PENDING") {
      if (direction === "OUTGOING") {
        return {
          text: "Requested",
          variant: "outline" as const,
          disabled: false,
          onClick: handleDisconnect,
        };
      } else {
        return {
          text: "Accept",
          variant: "default" as const,
          disabled: false,
          onClick: handleAccept,
        };
      }
    }

    return {
      text: "Connect",
      variant: "default" as const,
      disabled: false,
      onClick: handleConnect,
    };
  };

  const handleConnect = async () => {
    try {
      await sendConnectionRequest.mutateAsync({
        receiverId: profileId,
      });
      toast.success("Connection request sent!");
      refetchConnectionStatus();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send connection request",
      );
    }
  };

  const handleAccept = async () => {
    try {
      // This would be a different mutation for accepting
      await sendConnectionRequest.mutateAsync({
        receiverId: profileId,
      });
      toast.success("Connection accepted!");
      refetchConnectionStatus();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to accept connection",
      );
    }
  };

  const handleDisconnect = async () => {
    try {
      if (connectionData?.connectionId) {
        await disconnectConnection.mutateAsync(connectionData.connectionId);
        toast.success("Disconnected successfully");
        refetchConnectionStatus();
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to disconnect",
      );
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      // First get or create chat
      const chat = await getOrCreateChat.mutateAsync(profileId);

      // Then send message
      await sendMessage.mutateAsync({
        chatId: chat.id,
        content: message,
      });

      toast.success("Message sent!");
      setMessage("");
      setIsMessageDialogOpen(false);

      // Redirect to chat
      router.push(`/chat/${chat.id}`);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  };

  const connectionProps = getConnectionButtonProps();

  if (isProfileLoading) {
    return (
      <div className="w-full rounded-xl border bg-white shadow-sm overflow-hidden my-16 p-12 flex justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (profileError || !user) {
    return (
      <div className="w-full rounded-xl border bg-white shadow-sm overflow-hidden my-16 p-12">
        <p className="text-red-500 text-center">Failed to load user profile</p>
      </div>
    );
  }

  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full rounded-xl border bg-white shadow-sm overflow-hidden my-16">
      {/* Header / Profile info */}
      <div className="p-6 pb-2 flex gap-5">
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-semibold shadow-inner border-2 border-white">
            {user.avatar || user.profilePictureUrl ? (
              <Image
                src={user.avatar || user.profilePictureUrl || ""}
                alt={user.firstName || "User"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {user.firstName && user.lastName
              ? `${user.firstName} ${user.lastName}`
              : user.email}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {user.connectionCount || 0} connections
          </p>

          {user.bio && (
            <p className="mt-3 text-sm text-gray-700 leading-relaxed line-clamp-3">
              {user.bio}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
            {user.location && (
              <div className="flex gap-2.5 items-center">
                <MapPin size={16} />
                {user.location}
              </div>
            )}
            <div className="flex gap-2.5 items-center">
              <Calendar size={16} />
              Joined {formatDate(user.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-6 pt-2 flex gap-3 border-t">
        <Button
          variant={connectionProps.variant}
          className="flex-1"
          onClick={connectionProps.onClick}
          disabled={
            connectionProps.disabled ||
            sendConnectionRequest.isPending ||
            disconnectConnection.isPending ||
            isConnectionStatusLoading
          }
        >
          {sendConnectionRequest.isPending || disconnectConnection.isPending ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            connectionProps.text
          )}
        </Button>

        <Dialog
          open={isMessageDialogOpen}
          onOpenChange={setIsMessageDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex-1"
              disabled={getOrCreateChat.isPending}
            >
              {getOrCreateChat.isPending ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                "Message"
              )}
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>
                Message {user.firstName || user.email.split("@")[0]}
              </DialogTitle>
              <DialogDescription>
                Send a direct message to start a conversation.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="min-h-30"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={sendMessage.isPending}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setMessage("");
                  setIsMessageDialogOpen(false);
                }}
                disabled={sendMessage.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={
                  !message.trim() ||
                  sendMessage.isPending ||
                  getOrCreateChat.isPending
                }
              >
                {sendMessage.isPending ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent Activity section - User Posts */}
      <div className="border-t px-6 py-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Recent Activity
        </h2>

        {isPostsLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.content}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}

            {hasNextPage && (
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "View more posts"
                )}
              </Button>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">
            No recent activity to display
          </p>
        )}
      </div>
    </div>
  );
};
