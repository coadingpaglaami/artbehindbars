import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CommunityDiscussion = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center gap-4 text-center">
      {/* Lock Icon */}
      <Lock size={40} className="text-gray-400" />
      
      {/* Header */}
      <h3 className="text-2xl font-semibold text-gray-900">
        Join the Discussion
      </h3>
      
      {/* Paragraph */}
      <p className="text-gray-600 max-w-md">
        Login to create posts and engage with the community.
      </p>
      
      {/* Primary Button */}
      <Button className="bg-primary text-white">
        Login to Continue
      </Button>
    </div>
  );
};