import { Connection as ConnectionType } from "@/interface/connection";
import { MessageCircle, Ban, X, Users, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConnectionProps {
  connection: ConnectionType;
  isBlockedTab?: boolean;
  onMessage?: () => void;
  onBlock?: () => void;
  onUnblock?: () => void;
  onDisconnect?: () => void;
}

export const Connection = ({
  connection,
  isBlockedTab = false,
  onMessage,
  onBlock,
  onUnblock,
  onDisconnect,
}: ConnectionProps) => {
  // Generate initial from name
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
      {/* Left Side - User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar or Initial */}
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-semibold">
          {getInitial(connection.name)}
        </div>

        {/* Name and Connection Count */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {connection.name}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Users size={16} />
            <span className="text-sm">
              {connection.totalConnections} connections
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-2">
        {isBlockedTab ? (
          // Only show Unblock button for blocked users
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
            onClick={onUnblock}
            title="Unblock"
          >
            <Unlock size={20} className="text-blue-500" />
          </Button>
        ) : (
          // Show all actions for active connections
          <>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={onMessage}
              title="Message"
            >
              <MessageCircle size={20} className="text-green-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={onBlock}
              title="Block"
            >
              <Ban size={20} className="text-red-500" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={onDisconnect}
              title="Disconnect"
            >
              <X size={20} className="text-gray-600" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};