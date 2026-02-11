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
import { MessageCircle, AlertCircle } from "lucide-react";

interface ArtistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  artistName: string;
}

export const ArtistDialog = ({
  isOpen,
  onClose,
  artistName,
}: ArtistDialogProps) => {
  const [message, setMessage] = useState("");
  const maxLength = 300;

  const handleSubmit = () => {
    if (message.trim()) {
      console.log("Message submitted:", message);
      setMessage("");
      onClose();
    }
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
            To: <span className="font-semibold text-gray-900">{artistName}</span>
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
            />
            <p className="text-sm text-gray-500 mt-1 text-right">
              {message.length}/{maxLength} characters
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-primary text-white"
            onClick={handleSubmit}
            disabled={!message.trim()}
          >
            Submit for Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};