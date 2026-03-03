/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { HeadingTwo, SearchBar } from "@/webcomponents/reusable";
import { useState, useMemo, useEffect } from "react";
import { Connection } from "./Connection";
import { UserCheck, UserX, Clock, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import {
  useAcceptConnectionMutation,
  useDisconnectConnectionMutation,
  useGetIncomingRequests,
  useGetMyConnectionsInfinite,
  useGetMyRequests,
  useRejectConnectionMutation,
} from "@/api/connection";
import {
  useBlockUnblockUserMutation,
  useGetMyBlockedUsers,
} from "@/api/account";
import {
  Connection as ConnectionInterface,
  ConnectionUser,
} from "@/types/connection.type";
import { AccountProfile } from "@/types/account.type";
import { toast } from "sonner";
import { useGetOrCreateChatMutation, useSendMessageMutation } from "@/api/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getErrorMessage } from "@/lib/utils";

// Define types for the API responses

type PendingItem = {
  id: string;
  user: ConnectionUser;
  requestType: "incoming" | "outgoing";
  connectionId: string | null;
};

export const MyConnection = () => {
  const [search, setSearch] = useState("");
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [message, setMessage] = useState("");

  const { push } = useRouter();
  const [activeTab, setActiveTab] = useState<
    "connected" | "blocked" | "pending"
  >("connected");
  const { ref, inView } = useInView();

  // Fetch connections with infinite scroll
  const {
    data: connectionsData,
    isLoading: isLoadingConnections,
    error: connectionsError,
    fetchNextPage: fetchNextConnections,
    hasNextPage: hasMoreConnections,
    refetch: refetchConn,
    isFetchingNextPage: isFetchingMoreConnections,
  } = useGetMyConnectionsInfinite();

  // Fetch incoming requests - returns Connection[]
  const {
    data: incomingData,
    isLoading: isLoadingIncoming,
    error: incomingError,
    refetch: refetchIncoming,
  } = useGetIncomingRequests({ page: 1, limit: 20 });
  console.log(incomingData, "line 40");

  // Fetch my requests (outgoing) - returns AccountProfile[] directly in data
  const {
    data: outgoingData,
    isLoading: isLoadingOutgoing,
    error: outgoingError,
    refetch: refetchOutgoing,
  } = useGetMyRequests({ page: 1, limit: 20 });
  console.log(outgoingData, "line 60");

  // Fetch blocked users - returns PaginatedResponse<AccountProfile>
  const {
    data: blockedUsersData,
    isLoading: isLoadingBlocked,
    error: blockedError,
    refetch: refetchBlocked,
  } = useGetMyBlockedUsers({ page: 1, limit: 20 });

  // Mutations
  const blockUnblockMutation = useBlockUnblockUserMutation();
  const disconnectMutation = useDisconnectConnectionMutation();
  const acceptMutation = useAcceptConnectionMutation();
  const rejectMutation = useRejectConnectionMutation();
  const { mutate: chatMutate, isPending: isChatPending } =
    useGetOrCreateChatMutation();
  const { mutate: sendMessageMutate, isPending: isSendingMessage } =
    useSendMessageMutation();

  // Flatten connections from all pages
  const allConnections =
    connectionsData?.pages.flatMap((page) => page.data) ?? [];

  // Blocked users data - extract from paginated response
  const blockedUsers = blockedUsersData?.data ?? [];

  // Transform incoming and outgoing requests for pending tab
  const pendingRequests: PendingItem[] = useMemo(() => {
    const incoming = incomingData?.data ?? [];
    const outgoing = outgoingData?.data ?? [];

    const transformedIncoming: PendingItem[] = incoming.map((req) => ({
      id: req.id,
      user: req.requester ?? req.receiver!,
      requestType: "incoming",
      connectionId: req.id,
    }));

    const transformedOutgoing: PendingItem[] = outgoing.map((user) => ({
      id: user.id,
      user,
      requestType: "outgoing",
      connectionId: user.id,
    }));

    return [...transformedIncoming, ...transformedOutgoing];
  }, [incomingData, outgoingData]);

  console.log(pendingRequests, "line 96 ");

  // Load more connections when scrolling to bottom
  useEffect(() => {
    if (
      inView &&
      hasMoreConnections &&
      !isFetchingMoreConnections &&
      activeTab === "connected"
    ) {
      fetchNextConnections();
    }
  }, [
    inView,
    hasMoreConnections,
    isFetchingMoreConnections,
    fetchNextConnections,
    activeTab,
  ]);

  // Search filter based on active tab
  const filteredData = useMemo(() => {
    if (!search.trim()) {
      if (activeTab === "connected") return allConnections;
      if (activeTab === "blocked") return blockedUsers;
      return pendingRequests;
    }

    const searchLower = search.toLowerCase();

    if (activeTab === "connected") {
      return allConnections.filter((item: ConnectionInterface) => {
        const otherUser = item.requester ?? item.receiver;
        const fullName = otherUser
          ? `${otherUser.firstName || ""} ${otherUser.lastName || ""}`
              .trim()
              .toLowerCase()
          : "";
        return fullName.includes(searchLower);
      });
    }

    if (activeTab === "blocked") {
      return blockedUsers.filter((user: AccountProfile) => {
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .toLowerCase();
        return fullName.includes(searchLower);
      });
    }

    // Pending tab
    return pendingRequests.filter((item) => {
      const fullName = item
        ? `${item.user?.firstName || ""} ${item.user?.lastName || ""}`
            .trim()
            .toLowerCase()
        : "";
      return fullName.includes(searchLower);
    });
  }, [search, activeTab, allConnections, blockedUsers, pendingRequests]);

  // const handleMessage = (chatId?: string) => {
  //   if (chatId) {
  //     push(`/chat/${chatId}`);
  //   }
  // };

  const handleMessage = (userId: string, userName: string, chatId?: string) => {
    if (chatId) {
      push(`/chat/${chatId}`);
      return;
    }
    // No chat exists — open dialog to send first message
    setSelectedUser({ id: userId, name: userName });
    setIsMessageDialogOpen(true);
  };

  // Add this handler:
  const handleSendMessage = () => {
    if (!selectedUser || !message.trim()) return;

    chatMutate(selectedUser.id, {
      onSuccess: (chat) => {
        sendMessageMutate(
          { chatId: chat.id, content: message.trim() },
          {
            onSuccess: () => {
              toast.success("Message sent!");
              setMessage("");
              setIsMessageDialogOpen(false);
              push(`/chat/${chat.id}`);
            },
            onError: (error) => {
              const message = getErrorMessage(error);
              toast.error(message || "Failed to send message");
            },
          },
        );
      },
      onError: (error) => {        const message = getErrorMessage(error);
        toast.error(message || "Failed to start chat");
      }
    });
  };

  const handleBlock = async (userId: string) => {
    try {
      await blockUnblockMutation.mutateAsync(userId);
      toast.success("User has been blocked");
      refetchConn();
      refetchBlocked();
      refetchIncoming();
      refetchOutgoing();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to block user");
      console.error("Failed to block user:", error);
    }
  };

  const handleUnblock = async (userId: string) => {
    try {
      await blockUnblockMutation.mutateAsync(userId);
      toast.success("User has been unblocked");
      refetchConn();
      refetchBlocked();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to unblock user");
      console.error("Failed to unblock user:", error);
    }
  };

  const handleDisconnect = async (connectionId: string) => {
    console.log(connectionId);
    try {
      await disconnectMutation.mutateAsync(connectionId);
      toast.success("Connection has been disconnected");
      refetchConn();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to disconnect"); 
      console.error("Failed to disconnect:", error);
    }
  };

  const handleAcceptRequest = async (connectionId: string) => {
    try {
      await acceptMutation.mutateAsync(connectionId);
      refetchIncoming();
      refetchOutgoing();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to accept request");
      console.error("Failed to accept request:", error);
    }
  };

  const handleRejectRequest = async (connectionIdOrUserId: string) => {
    try {
      // For outgoing requests, we might need to use a different endpoint
      // This assumes reject mutation works with user ID for outgoing requests
      await rejectMutation.mutateAsync(connectionIdOrUserId);
      refetchIncoming();
      refetchOutgoing();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message || "Failed to reject/cancel request");
      console.error("Failed to reject/cancel request:", error);
    }
  };

  const getLoadingState = () => {
    if (activeTab === "connected") return isLoadingConnections;
    if (activeTab === "blocked") return isLoadingBlocked;
    return isLoadingIncoming || isLoadingOutgoing;
  };

  const getErrorState = () => {
    if (activeTab === "connected") return connectionsError;
    if (activeTab === "blocked") return blockedError;
    return incomingError || outgoingError;
  };

  const isLoading = getLoadingState();
  const error = getErrorState();

  if (isLoading) {
    return (
      <div className="py-16 px-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 px-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
          Failed to load {activeTab} connections
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4">
      <div className="space-y-6">
        <HeadingTwo
          title="My Connections"
          description="Manage your connections and interactions."
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Connected Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck size={24} className="text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {allConnections.length}
              </div>
              <div className="text-gray-600">Connected</div>
            </div>
          </div>

          {/* Pending Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {pendingRequests.length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
          </div>

          {/* Blocked Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <UserX size={24} className="text-red-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {blockedUsers.length}
              </div>
              <div className="text-gray-600">Blocked</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b border-gray-200 relative">
            {/* Active Tab Indicator */}
            <div
              className="absolute bottom-0 h-1 bg-primary transition-all duration-300 ease-in-out"
              style={{
                width: "33.333%",
                transform: `translateX(${
                  activeTab === "connected"
                    ? "0%"
                    : activeTab === "pending"
                      ? "100%"
                      : "200%"
                })`,
              }}
            />

            <button
              onClick={() => setActiveTab("connected")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "connected"
                  ? "text-primary bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Connected ({allConnections.length})
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "pending"
                  ? "text-primary bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Pending ({pendingRequests.length})
            </button>
            <button
              onClick={() => setActiveTab("blocked")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === "blocked"
                  ? "text-primary bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Blocked ({blockedUsers.length})
            </button>
          </div>

          {/* Search Bar */}
          {/* <div className="p-4">
            <SearchBar
              placeholder={`Search ${activeTab} connections...`}
              value={search}
              onChange={setSearch}
            />
          </div> */}
        </div>

        {/* Connections List */}
        <div className="space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((item) => {
              // Handle blocked users
              if (activeTab === "blocked") {
                const blockedUser = item as AccountProfile;
                return (
                  <Connection
                    key={blockedUser.id}
                    type="blocked"
                    user={blockedUser}
                    onUnblock={() => handleUnblock(blockedUser.id)}
                    isBlockPending={blockUnblockMutation.isPending}
                  />
                );
              }

              // Handle pending requests
              if (activeTab === "pending") {
                const pendingItem = item as PendingItem;
                console.log(pendingItem, "line 366");
                return (
                  <Connection
                    key={`${pendingItem.user.id}-${pendingItem.id}`}
                    type="pending"
                    user={pendingItem.user as AccountProfile}
                    requestType={pendingItem.requestType}
                    connectionId={pendingItem.id}
                    onAcceptRequest={() =>
                      pendingItem.id && handleAcceptRequest(pendingItem.id)
                    }
                    onRejectRequest={() =>
                      handleRejectRequest(
                        pendingItem.id ||
                          pendingItem?.connectionId ||
                          pendingItem.user.id,
                      )
                    }
                    isAcceptPending={acceptMutation.isPending}
                    isRejectPending={rejectMutation.isPending}
                  />
                );
              }

              // Handle connected users
              const connection = item as unknown as {
                connectionId: string;
                chatId: string;
                user: AccountProfile;
              };
              console.log(connection.user, "line 435");

              return (
                <Connection
                  key={connection.connectionId}
                  type="connected"
                  connection={connection.connectionId}
                  otherUser={connection.user}
                  // onMessage={() => handleMessage(connection.chatId)}
                  onMessage={() =>
                    handleMessage(
                      connection.user.id,
                      `${connection.user.firstName ?? ""} ${connection.user.lastName ?? ""}`.trim(),
                      connection.chatId, // if chatId exists, navigate directly
                    )
                  }
                  onBlock={() => handleBlock(connection.user.id)}
                  onDisconnect={() => handleDisconnect(connection.connectionId)}
                  isBlockPending={blockUnblockMutation.isPending}
                  isDisconnectPending={disconnectMutation.isPending}
                />
              );
            })
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No {activeTab} connections found
              </h3>
              <p className="text-gray-600">
                {search.trim()
                  ? "Try adjusting your search criteria"
                  : `You don't have any ${activeTab} connections yet`}
              </p>
            </div>
          )}

          {/* Infinite scroll loader for connections tab */}
          {activeTab === "connected" && hasMoreConnections && (
            <div ref={ref} className="flex justify-center py-4">
              {isFetchingMoreConnections && (
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              )}
            </div>
          )}
        </div>
      </div>
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Message {selectedUser?.name || "User"}</DialogTitle>
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
                disabled={isSendingMessage || isChatPending}
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
              disabled={isSendingMessage || isChatPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || isSendingMessage || isChatPending}
            >
              {isSendingMessage || isChatPending ? (
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
  );
};
