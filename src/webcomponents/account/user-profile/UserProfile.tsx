// components/ArtistInfo.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { mockUsers } from "@/data/userdata";
import { Calendar, MapPin } from "lucide-react";

export const UserProfile = ({ profileId }: { profileId: string }) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const user = mockUsers.find((user) => user.id === profileId);

  if (!user) {
    return <div>User not found</div>;
  }

  const handleSendMessage = () => {
    console.log("Sending message:", {
      subject,
      message,
      to: user.name,
    });

    setMessage("");
    setSubject("");
  };

  return (
    <div className="w-full  rounded-xl border bg-white shadow-sm overflow-hidden my-16">
      {/* Header / Profile info */}
      <div className="p-6 pb-2 flex gap-5">
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-2xl font-semibold shadow-inner border-2 border-white">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {user.name}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            @{user.connections} connections
          </p>

          <p className="mt-3 text-sm text-gray-700 leading-relaxed line-clamp-3">
            {user.headline}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
            <div className="flex gap-2.5"><MapPin /> {user.location}</div>
            <div className="flex gap-2.5"><Calendar /> {user.joined}</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-6 pt-2 flex gap-3 border-t">
        <Button variant="default" className="flex-1">
          Connect
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              Message
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Message {user.name.split(" ")[0]}</DialogTitle>
              <DialogDescription>
                Send a direct message to start a conversation.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="e.g. Interested in your art collection"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  className="min-h-30"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setMessage("");
                  setSubject("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recent Activity section */}
      <div className="border-t px-6 py-5">
        <h2 className="text-base font-semibold text-gray-900 mb-3">
          Recent Activity
        </h2>
        <p className="text-sm text-gray-500 italic">
          No recent activity to display
        </p>
      </div>
    </div>
  );
};
