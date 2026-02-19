import { Connection as ConnectionType } from "@/types/connection.type";
import {
  MessageCircle,
  Ban,
  X,
  Users,
  Unlock,
  Loader2,
  Check,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AccountProfile } from "@/types/account.type";
import Image from "next/image";

interface ConnectionProps {
  connection?: ConnectionType | string;
  user?: AccountProfile;
  otherUser?: AccountProfile;
  type: "connected" | "blocked" | "pending";
  requestType?: "incoming" | "outgoing";
  connectionId?: string | null;
  onMessage?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onDisconnect?: () => void;
  onAcceptRequest?: () => void;
  onRejectRequest?: () => void;
  isBlockPending?: boolean;
  isDisconnectPending?: boolean;
  isAcceptPending?: boolean;
  isRejectPending?: boolean;
}

export const Connection = ({
  user,
  otherUser,
  type,
  requestType,
  connectionId,
  onMessage,
  onBlock,
  onUnblock,
  onDisconnect,
  onAcceptRequest,
  onRejectRequest,
  isBlockPending = false,
  isDisconnectPending = false,
  isAcceptPending = false,
  isRejectPending = false,
}: ConnectionProps) => {
  // For blocked users or pending requests, use the user prop directly
  // For connected, use otherUser or extract from connection
  console.log(otherUser, " line 55 ");
  const displayUser =
    type === "blocked" || type === "pending" ? user : otherUser;

  // Generate initials from name
  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "?";
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  const getFullName = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "Unknown User";
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  const fullName = getFullName(displayUser?.firstName, displayUser?.lastName);
  const initials = getInitials(displayUser?.firstName, displayUser?.lastName);
  const connectionsCount = displayUser?.connectionsCount ?? 0;

  const getStatusBadge = () => {
    if (type === "pending") {
      if (requestType === "incoming") {
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            <ArrowRight size={12} />
            Incoming Request
          </span>
        );
      } else {
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            <Clock size={12} />
            Awaiting Response
          </span>
        );
      }
    }
    return null;
  };

  // Don't render if no display user
  if (!displayUser) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Left Side - User Info */}
      <div className="flex items-center gap-3 flex-1">
        {/* Avatar or Initial */}
        {displayUser?.profilePictureUrl ? (
          <Image
            src={displayUser.profilePictureUrl}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
            {initials}
          </div>
        )}

        {/* Name and Connection Count */}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-semibold text-gray-900">{fullName}</h3>
            {getStatusBadge()}
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users size={16} />
            <span className="text-sm">{connectionsCount} connections</span>
          </div>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        {type === "blocked" && (
          // Only show Unblock button for blocked users
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            onClick={onUnblock}
            title="Unblock"
            disabled={isBlockPending}
          >
            {isBlockPending ? (
              <Loader2 size={20} className="animate-spin text-blue-500" />
            ) : (
              <Unlock size={20} className="text-blue-500" />
            )}
          </Button>
        )}

        {type === "connected" && (
          // Show actions for active connections
          <>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={onMessage}
              title="Message"
              disabled={
                isBlockPending || isDisconnectPending || !displayUser?.id
              }
            >
              <MessageCircle size={20} className="text-green-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={onBlock}
              title="Block"
              disabled={isBlockPending || isDisconnectPending}
            >
              {isBlockPending ? (
                <Loader2 size={20} className="animate-spin text-red-500" />
              ) : (
                <Ban size={20} className="text-red-500" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={onDisconnect}
              title="Disconnect"
              disabled={isBlockPending || isDisconnectPending}
            >
              {isDisconnectPending ? (
                <Loader2 size={20} className="animate-spin text-gray-600" />
              ) : (
                <X size={20} className="text-gray-600" />
              )}
            </Button>
          </>
        )}

        {type === "pending" &&
          requestType === "incoming" &&
          // Show Accept/Reject for incoming requests (only if connectionId exists)
          connectionId && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={onAcceptRequest}
                title="Accept Request"
                disabled={isAcceptPending || isRejectPending}
              >
                {isAcceptPending ? (
                  <Loader2 size={20} className="animate-spin text-green-500" />
                ) : (
                  <Check size={20} className="text-green-500" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={onRejectRequest}
                title="Reject Request"
                disabled={isAcceptPending || isRejectPending}
              >
                {isRejectPending ? (
                  <Loader2 size={20} className="animate-spin text-red-500" />
                ) : (
                  <X size={20} className="text-red-500" />
                )}
              </Button>
            </>
          )}

        {type === "pending" && requestType === "outgoing" && (
          // Show cancel/withdraw for outgoing requests
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            onClick={onRejectRequest}
            title="Cancel Request"
            disabled={isRejectPending}
          >
            {isRejectPending ? (
              <Loader2 size={20} className="animate-spin text-red-500" />
            ) : (
              <X size={20} className="text-red-500" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
