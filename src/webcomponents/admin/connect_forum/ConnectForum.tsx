"use client";

import { useState } from "react";
import { AdminHeading } from "@/webcomponents/reusable";
import { ForumData } from "./ForumData";
import { Pagination } from "@/webcomponents/reusable";
import { CategoryOrState } from "./CategoryOrState";
import {
  useAdminDeletePostMutation,
  useGetReportedPosts,
  useSuspendUserMutation,
  useWarnUserMutation,
} from "@/api/post";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Flag, User, MessageSquare, UserX } from "lucide-react";
import { toast } from "sonner";
import { ReportedPost } from "@/types/post.type";

export const ConnectForum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [activeTab, setActiveTab] = useState<"categories" | "states">(
    "categories",
  );

  const [selectedPost, setSelectedPost] = useState<ReportedPost | null>(null);
  const [isReportSheetOpen, setIsReportSheetOpen] = useState(false);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [actionReason, setActionReason] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [currentAction, setCurrentAction] = useState<"warn" | "suspend" | null>(
    null,
  );
  const [suspendDays, setSuspendDays] = useState<number>(7);

  const { data: reportedPostsResponse, isLoading } = useGetReportedPosts({
    page: currentPage,
    limit: itemsPerPage,
    minReports: 3,
  });

  const { mutate: adminDeletePost, isPending: isDeleting } =
    useAdminDeletePostMutation();

  const { mutate: suspendUser, isPending: isSuspending } =
    useSuspendUserMutation();

  const { mutate: warnUser, isPending: isWarning } = useWarnUserMutation();

  const reportedPosts = (reportedPostsResponse?.data || []).map((post) => ({
    ...post,
    postId: post.id,
  })) as unknown as ReportedPost[];
  const paginationMeta = reportedPostsResponse?.meta;

  const totalPages = paginationMeta?.totalPages || 1;

  const handleDeletePost = (postId: string) => {
    adminDeletePost(postId, {
      onSuccess: () => {
        toast.success("Post deleted successfully");
      },
      onError: (error) => {
        toast.error("Failed to delete post");
        console.error("Delete error:", error);
      },
    });
  };

  const handleViewReports = (post: ReportedPost) => {
    setSelectedPost(post);
    setIsReportSheetOpen(true);
  };

  const handleWarnUser = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setCurrentAction("warn");
    setIsWarningDialogOpen(true);
  };

  const handleSuspendUser = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setCurrentAction("suspend");
    setIsSuspendDialogOpen(true);
  };

  const handleActionSubmit = () => {
    if (!actionReason.trim()) {
      toast.error(
        `Please provide a reason for ${currentAction === "warn" ? "warning" : "suspension"}`,
      );
      return;
    }

    if (currentAction === "warn") {
      warnUser(
        { userId: selectedUserId, reason: actionReason },
        {
          onSuccess: () => {
            toast.success(`Warning sent to ${selectedUserName}`);
            resetActionDialogs();
          },
          onError: (error) => {
            toast.error("Failed to send warning");
            console.error("Warning error:", error);
          },
        },
      );
    } else if (currentAction === "suspend") {
      suspendUser(
        { userId: selectedUserId, days: suspendDays },
        {
          onSuccess: () => {
            toast.success(`${selectedUserName} has been suspended`);
            resetActionDialogs();
          },
          onError: (error) => {
            toast.error("Failed to suspend user");
            console.error("Suspend error:", error);
          },
        },
      );
    }
  };

  const resetActionDialogs = () => {
    setIsWarningDialogOpen(false);
    setIsSuspendDialogOpen(false);
    setActionReason("");
    setSelectedUserId("");
    setSelectedUserName("");
    setCurrentAction(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="CONNECT Forum Moderation"
        subheading="Review community discussions and handle reported content."
      />

      <div className="bg-white rounded-lg shadow p-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab("categories")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "categories"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab("states")}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === "states"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            States
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === "categories" ? (
            <CategoryOrState type="category" />
          ) : (
            <CategoryOrState type="state" />
          )}
        </div>
      </div>

      {/* Forum Posts */}
      <ForumData
        posts={reportedPosts}
        onDeletePost={handleDeletePost}
        onViewReports={handleViewReports}
        onWarnUser={handleWarnUser}
        onSuspendUser={handleSuspendUser}
        isDeleting={isDeleting}
        isWarnLoading={isWarning}
        isSuspendLoading={isSuspending}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Empty State */}
      {reportedPosts.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Reported Posts Found
          </h3>
          <p className="text-gray-600">
            There are no posts with 3 or more reports at this time.
          </p>
        </div>
      )}

      {/* Reports Sheet */}
      <Sheet open={isReportSheetOpen} onOpenChange={setIsReportSheetOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-xl">
              <Flag className="h-5 w-5 text-orange-500" />
              Post Reports
            </SheetTitle>
          </SheetHeader>

          {selectedPost && (
            <div className="mt-6 space-y-6">
              {/* Post Details */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-lg">{selectedPost.title}</h3>
                <p className="text-gray-700">{selectedPost.content}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{selectedPost.userName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {selectedPost.reportCount} reports
                  </span>
                </div>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Reports</h4>
                {selectedPost.reports.map((report, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 space-y-2 bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {report.userFirstName}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
                        {report.reason.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm pl-6">
                      {report.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="border-t pt-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsReportSheetOpen(false);
                    handleWarnUser(selectedPost.userId, selectedPost.userName);
                  }}
                >
                  Warn User
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    setIsReportSheetOpen(false);
                    handleSuspendUser(
                      selectedPost.userId,
                      selectedPost.userName,
                    );
                  }}
                >
                  Suspend User
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Warning Dialog */}
      <Dialog open={isWarningDialogOpen} onOpenChange={setIsWarningDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              Send Warning to {selectedUserName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="warningReason">Reason for warning</Label>
              <Textarea
                id="warningReason"
                placeholder="Please provide the reason for this warning..."
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows={4}
                className="resize-none"
              />
              <p className="text-xs text-gray-500">
                This warning will be sent to the user and recorded in the
                system.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={resetActionDialogs}>
              Cancel
            </Button>
            <Button
              onClick={handleActionSubmit}
              disabled={isWarning || !actionReason.trim()}
            >
              {isWarning ? "Sending..." : "Send Warning"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Dialog */}
      <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-500" />
              Suspend {selectedUserName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="suspendDays">Suspend for (days)</Label>
              <input
                id="suspendDays"
                type="number"
                min={1}
                value={suspendDays}
                onChange={(e) => setSuspendDays(Number(e.target.value))}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={resetActionDialogs}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleActionSubmit}
              disabled={isSuspending || !actionReason.trim()}
            >
              {isSuspending ? "Suspending..." : "Suspend User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
