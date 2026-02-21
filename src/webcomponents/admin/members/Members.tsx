/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { AdminHeading } from "@/webcomponents/reusable";
import { useState, useMemo, useEffect } from "react";
import { MemberTable } from "./MemberTable";
import { Pagination } from "@/webcomponents/reusable";
import { useGetUserActivities } from "@/api/progress";
import { useSuspendUserMutation, useUnSuspendUserMutation } from "@/api/post";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertCircle, UserX, UserCheck } from "lucide-react";
import { toast } from "sonner";

const SUSPENSION_DURATIONS = [
  { value: 1, label: "1 day" },
  { value: 3, label: "3 days" },
  { value: 7, label: "7 days" },
  { value: 14, label: "14 days" },
  { value: 30, label: "30 days" },
  { value: 60, label: "60 days" },
  { value: 90, label: "90 days" },
  { value: 365, label: "1 year" },
];

export const Members = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isUnSuspendDialogOpen, setIsUnSuspendDialogOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [selectedDuration, setSelectedDuration] = useState<number>(7);
  const itemsPerPage = 10;

  const { data, isLoading, isError, refetch,isFetching } = useGetUserActivities({
    search: debouncedSearch,
    page: currentPage,
    limit: itemsPerPage,
  });

  const { mutate: suspendUser, isPending: isSuspendLoading } =
    useSuspendUserMutation();
  const { mutate: unSuspendUser, isPending: isUnSuspendLoading } =
    useUnSuspendUserMutation();

  const handleSuspend = (userId: string, userName?: string) => {
    // fallback to lookup when only userId is provided
    const fallbackName =
      members.find((m) => m.id === userId)?.name ?? "this user";

    setSelectedUserId(userId);
    setSelectedUserName(userName ?? fallbackName);
    setSelectedDuration(7); // Default to 7 days
    setIsSuspendDialogOpen(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [search]);

  const handleUnSuspend = (userId: string, userName?: string) => {
    const fallbackName =
      members.find((m) => m.id === userId)?.name ?? "this user";

    setSelectedUserId(userId);
    setSelectedUserName(userName ?? fallbackName);
    setIsUnSuspendDialogOpen(true);
  };

  const handleSuspendConfirm = () => {
    suspendUser(
      {
        userId: selectedUserId,
        days: selectedDuration, // API expects duration in days
      },
      {
        onSuccess: () => {
          toast.success(
            `${selectedUserName} has been suspended for ${selectedDuration} day${selectedDuration > 1 ? "s" : ""}`,
          );
          setIsSuspendDialogOpen(false);
          refetch(); // Refresh the user list
        },
        onError: (error) => {
          toast.error("Failed to suspend user");
          console.error("Suspend error:", error);
        },
      },
    );
  };

  const handleUnSuspendConfirm = () => {
    unSuspendUser(selectedUserId, {
      onSuccess: () => {
        toast.success(`${selectedUserName} has been unsuspended`);
        setIsUnSuspendDialogOpen(false);
        refetch(); // Refresh the user list
      },
      onError: (error) => {
        toast.error("Failed to unsuspend user");
        console.error("Unsuspend error:", error);
      },
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const members = useMemo(() => {
    if (!data?.data) return [];
    return data.data.data;
  }, [data]);

  const totalPages = data?.data?.meta?.totalPages || 1;

  const isInitialLoading = isLoading && !data;

  if (isError) {
    return (
      <div className="py-16 flex justify-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          Error loading members. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Member Directory"
        subheading="Manage user accounts and moderation."
      />

      <div className="relative group">
        <input
          type="text"
          placeholder="Search by name, email or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full h-12 px-6 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-400"
        />
      </div>

     {isInitialLoading ? (
  <div className="py-16 flex justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
) : (
  <MemberTable
    members={members}
    onSuspend={handleSuspend}
    onUnSuspend={handleUnSuspend}
    isSuspendLoading={isSuspendLoading}
    isUnSuspendLoading={isUnSuspendLoading}
    isFetching={isFetching}
  />
)}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {members.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Members Found
          </h3>
          <p className="text-gray-600">
            {search
              ? "No members match your search criteria."
              : "There are no members to display."}
          </p>
        </div>
      )}

      {/* Suspend Dialog */}
      <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-orange-500" />
              Suspend {selectedUserName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div className="text-sm text-orange-800">
                <p className="font-medium mb-1">Suspension will:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Prevent user from posting or commenting</li>
                  <li>Hide their content from public view</li>
                  <li>Send notification to the user</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">
                Suspension Duration
              </Label>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {SUSPENSION_DURATIONS.find(
                      (d) => d.value === selectedDuration,
                    )?.label || "Select duration"}
                    <span className="ml-2">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-50">
                  <DropdownMenuRadioGroup
                    value={selectedDuration.toString()}
                    onValueChange={(value) =>
                      setSelectedDuration(parseInt(value))
                    }
                  >
                    {SUSPENSION_DURATIONS.map((duration) => (
                      <DropdownMenuRadioItem
                        key={duration.value}
                        value={duration.value.toString()}
                      >
                        {duration.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-xs text-gray-500">
              This action can be reversed by an admin before the duration ends.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsSuspendDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleSuspendConfirm}
              disabled={isSuspendLoading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isSuspendLoading ? "Suspending..." : "Confirm Suspension"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* UnSuspend Dialog */}
      <Dialog
        open={isUnSuspendDialogOpen}
        onOpenChange={setIsUnSuspendDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              Unsuspend {selectedUserName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">Unsuspension will:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Restore user&apos;s ability to post and comment</li>
                  <li>Make their content visible again</li>
                  <li>Send notification to the user</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to unsuspend{" "}
              <span className="font-semibold">{selectedUserName}</span>? This
              action will restore their full access to the forum.
            </p>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsUnSuspendDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleUnSuspendConfirm}
              disabled={isUnSuspendLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isUnSuspendLoading ? "Unsuspending..." : "Confirm Unsuspension"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
