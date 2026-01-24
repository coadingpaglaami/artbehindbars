"use client";

import { Member } from "@/interface/admin";
import { Shield, Ban, UserX } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface MemberTableProps {
  members: Member[];
  onSuspend: (memberId: string) => void;
  onBan: (memberId: string) => void;
}

export const MemberTable = ({ members, onSuspend, onBan }: MemberTableProps) => {
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
              return (
                <tr
                  key={member.memberId}
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
                    {formatDate(member.joinedDate)}
                  </td>

                  {/* Activity Score */}
                  <td className="px-6 py-4">
                    <div className="space-y-1 min-w-[120px]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {member.activityScore}
                        </span>
                        <span className="text-xs text-gray-500">/ 100</span>
                      </div>
                      <Progress
                        value={member.activityScore}
                        className="h-2 **:data-[slot=progress-indicator]:bg-blue-600"
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
                      {member.status !== "Suspended" && (
                        <button
                          onClick={() => onSuspend(member.memberId)}
                          className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Suspend"
                        >
                          <UserX size={18} className="text-orange-600" />
                        </button>
                      )}
                      {member.status !== "Banned" && (
                        <button
                          onClick={() => onBan(member.memberId)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Ban"
                        >
                          <Ban size={18} className="text-red-600" />
                        </button>
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