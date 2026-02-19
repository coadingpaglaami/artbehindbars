import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FormattedFanMail } from "@/types/fanmail.type";

interface FanMailSheetProps {
  message: FormattedFanMail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArchive: (messageId: string) => void;
  onReply: (messageId: string, replyMessage: string) => void;
  isArchiving?: boolean;
  isReplying?: boolean;
}

export const FanMailSheet = ({ 
  message, 
  open, 
  onOpenChange,
  onArchive,
  onReply,
  isArchiving = false,
  isReplying = false
}: FanMailSheetProps) => {
  const [replyText, setReplyText] = useState('');

  if (!message) return null;

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(message.messageId, replyText);
    }
  };

  const handleArchive = () => {
    onArchive(message.messageId);
  };

  const isPending = isArchiving || isReplying;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-white p-2.5">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Message Details</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Status and Date */}
          <div className="flex items-center justify-between">
            <Badge
              className={
                message.status === 'Unread' 
                  ? 'bg-blue-50 text-blue-600 hover:bg-blue-50' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-100'
              }
            >
              {message.status}
            </Badge>
            <span className="text-sm text-gray-500">{message.date}</span>
          </div>

          {/* From */}
          <div>
            <label className="text-sm font-medium text-gray-700">From</label>
            <p className="mt-1 text-sm text-gray-900">{message.from}</p>
          </div>

          {/* To */}
          <div>
            <label className="text-sm font-medium text-gray-700">To</label>
            <p className="mt-1 text-sm text-blue-600">{message.to}</p>
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-gray-700">Subject</label>
            <p className="mt-1 text-sm text-gray-900">{message.subject}</p>
          </div>

          {/* Body */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{message.body}</p>
          </div>

          {/* Reply - Only show for non-archived messages */}
          {!message.isArchived && message.status !== "Replied" && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Reply</label>
              <Textarea 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="min-h-30"
                disabled={isPending}
              />
            </div>
          )}

          {/* Disclaimer */}
          <div className="bg-[#FFFBEB] p-4 rounded-lg">
            <p className="text-sm text-[#92400E] leading-relaxed">
              This message will be forwarded to the artist on behalf of the fan.
              Please review the content carefully before sending.
              All replies are monitored for quality and appropriateness.
              The artist&apos;s contact information will remain private.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!message.isArchived && message.status !== "Replied" && (
              <Button 
                className="flex-1" 
                onClick={handleReply}
                disabled={isPending || !replyText.trim()}
              >
                {isReplying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Reply"
                )}
              </Button>
            )}
            
            {!message.isArchived && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleArchive}
                disabled={isPending}
              >
                {isArchiving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Archiving...
                  </>
                ) : (
                  "Archive"
                )}
              </Button>
            )}

            {message.isArchived && (
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            )}
          </div>

          {/* Show message if already replied */}
          {message.status === "Replied" && !message.isArchived && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                This message has been replied to and forwarded to the artist.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};