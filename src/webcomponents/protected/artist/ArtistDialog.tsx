"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSendFanMail } from "@/api/gallary";
import { ErrorResponse } from "@/types/error.type";

interface ArtistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
  artistId: string; // Make it required
}

export const ArtistDialog = ({
  isOpen,
  onClose,
  artistName,
  artistId,
}: ArtistDialogProps) => {
  const [message, setMessage] = useState("");
  const maxLength = 300;
  const { mutate: sendFanMail, isPending } = useSendFanMail();

  const handleSubmit = () => {
    if (!message.trim() || !artistId) return;

    sendFanMail(
      {
        artistId,
        payload: { message: message.trim() },
      },
      {
        onSuccess: () => {
          toast.success("Fan mail sent successfully!", {
            description:
              "Your message will be reviewed before being forwarded to the artist.",
            duration: 5000,
          });
          setMessage("");
          onClose();
        },
        onError: (error: unknown) => {
          toast.error("Failed to send fan mail", {
            description:
              (error as ErrorResponse).response?.data?.message ||
              "Please try again later.",
            duration: 5000,
          });
        },
      },
    );
  };

  const importantPoints = [
    "Messages must be respectful and appropriate",
    "No requests for personal information or contact details",
    "Allow 7-14 days for review and delivery",
    "You will be notified if your message cannot be forwarded",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle className="text-2xl">Send Fan Mail</DialogTitle>
          <DialogDescription>
            To:{" "}
            <span className="font-semibold text-gray-900">{artistName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Important Notice */}
          <div
            className="p-4 rounded-lg border"
            style={{ backgroundColor: "#EFF6FF", borderColor: "#BEDBFF" }}
          >
            <div className="flex items-start gap-3">
              <MessageCircle size={20} style={{ color: "#155DFC" }} />
              <div>
                <p className="font-bold mb-2" style={{ color: "#1C398E" }}>
                  <AlertCircle
                    size={16}
                    className="inline mr-1"
                    style={{ color: "#1C398E" }}
                  />
                  Important: Your message will be reviewed by our administration
                  team before being forwarded to the artist.
                </p>
                <ul className="space-y-1" style={{ color: "#1C398E" }}>
                  {importantPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className="mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <Textarea
              placeholder="Share your appreciation for this artist's work..."
              value={message}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setMessage(e.target.value);
                }
              }}
              className="min-h-32"
              disabled={isPending}
            />
            <p className="text-sm text-gray-500 mt-1 text-right">
              {message.length}/{maxLength} characters
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            className="bg-primary text-white"
            onClick={handleSubmit}
            disabled={!message.trim() || isPending}
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit for Review"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
