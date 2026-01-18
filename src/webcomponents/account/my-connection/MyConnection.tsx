"use client";

import { myConnection } from "@/data/connection-data";
import { HeadingTwo, SearchBar } from "@/webcomponents/reusable";
import { useState, useMemo } from "react";
import { Connection } from "./Connection";
import { UserCheck, UserX } from "lucide-react";

export const MyConnection = () => {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"connected" | "blocked">(
    "connected",
  );

  // Filter connections
  const connectedUsers = myConnection.filter((conn) => !conn.isBlocked);
  const blockedUsers = myConnection.filter((conn) => conn.isBlocked);

  // Search filter based on active tab
  const filteredConnections = useMemo(() => {
    const dataToFilter =
      activeTab === "connected" ? connectedUsers : blockedUsers;

    if (!search.trim()) return dataToFilter;

    return dataToFilter.filter((conn) =>
      conn.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, activeTab, connectedUsers, blockedUsers]);

  const handleMessage = (id: string) => {
    console.log("Message user:", id);
  };

  const handleBlock = (id: string) => {
    console.log("Block user:", id);
  };

  const handleUnblock = (id: string) => {
    console.log("Unblock user:", id);
  };

  const handleDisconnect = (id: string) => {
    console.log("Disconnect user:", id);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <HeadingTwo
          title="My Connections"
          description="Manage your connections and interactions."
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Connected Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <UserCheck size={24} className="text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {connectedUsers.length}
              </div>
              <div className="text-gray-600">Connected</div>
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
                width: "50%",
                transform: `translateX(${activeTab === "connected" ? "0%" : "100%"})`,
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
              Connected ({connectedUsers.length})
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
          <div className="p-4">
            <SearchBar
              placeholder={`Search ${activeTab} connections...`}
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        {/* Connections List */}
        <div className="space-y-3">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => (
              <Connection
                key={connection.id}
                connection={connection}
                isBlockedTab={activeTab === "blocked"}
                onMessage={() => handleMessage(connection.id)}
                onBlock={() => handleBlock(connection.id)}
                onUnblock={() => handleUnblock(connection.id)}
                onDisconnect={() => handleDisconnect(connection.id)}
              />
            ))
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
        </div>
      </div>
    </div>
  );
};
