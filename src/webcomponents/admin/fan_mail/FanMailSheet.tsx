import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { FanMailInterface } from "@/interface/admin"
import { useState } from "react";

export const FanMailSheet = ({ 
  message, 
  open, 
  onOpenChange 
}: { 
  message: FanMailInterface | null, 
  open: boolean, 
  onOpenChange: (open: boolean) => void 
}) => {
  const [replyText, setReplyText] = useState('');

  if (!message) return null;

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

          {/* Reply */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Reply</label>
            <Textarea 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              className="min-h-30"
            />
          </div>

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
            <Button className="flex-1">Reply</Button>
            <Button variant="outline" className="flex-1">Archive</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};