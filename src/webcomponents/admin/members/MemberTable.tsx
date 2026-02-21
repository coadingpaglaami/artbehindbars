"use client";

import { UserX, UserCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UserActivity } from "@/types/progress.type";
import { Button } from "@/components/ui/button";

interface MemberTableProps {
  members: UserActivity[];
  onSuspend: (memberId: string, userName?: string) => void;
  onUnSuspend: (memberId: string, userName?: string) => void;
  isSuspendLoading?: boolean;
  isUnSuspendLoading?: boolean;
  isFetching?: boolean;
}

export const MemberTable = ({ 
  members, 
  onSuspend, 
  onUnSuspend,
  isSuspendLoading,
  isUnSuspendLoading,
  isFetching
}: MemberTableProps) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return {
          bg: "#DEF7EC",
          text: "#03543F",
        };
      case "Suspended":
        return {
          bg: "#FED7AA",
          text: "#C2410C",
        };
      case "Banned":
        return {
          bg: "#FEE2E2",
          text: "#991B1B",
        };
      default:
        return {
          bg: "#F3F4F6",
          text: "#6B7280",
        };
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead style={{ backgroundColor: "#F8FAFC" }}>
            <tr className="border-b" style={{ borderColor: "#E2E8F0" }}>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Member
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Activity Score
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              const statusStyle = getStatusStyle(member.status);
              const isSuspended = member.status === "Suspended";
              
              return (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                  style={{ borderColor: "#E2E8F0" }}
                >
                  {/* Member */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-semibold">
                          {getInitial(member.name)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {member.name}
                        </span>
                        <span className="text-sm text-gray-500">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(member.createdAt)}
                  </td>

                  {/* Activity Score */}
                  <td className="px-6 py-4">
                    <div className="space-y-1 min-w-30">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {member.score}
                        </span>
                        <span className="text-xs text-gray-500">/ 100</span>
                      </div>
                      <Progress
                        value={member.score}
                        className="h-2 [&>div]:bg-blue-600"
                        style={{ backgroundColor: "#E0E7FF" }}
                      />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.text,
                      }}
                    >
                      {member.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {!isSuspended ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSuspend(member.id, member.name)}
                          disabled={isSuspendLoading}
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                          <UserX size={18} className="mr-2" />
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onUnSuspend(member.id, member.name)}
                          disabled={isUnSuspendLoading}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <UserCheck size={18} className="mr-2" />
                          Unsuspend
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};