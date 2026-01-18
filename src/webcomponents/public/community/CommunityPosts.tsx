import { CommunityPost } from "@/interface/community";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CommunityPosts = ({
  community,
  index,
}: {
  community: CommunityPost;
  index: number;
}) => {
  // Calculate time ago from posted date
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInMs = now.getTime() - posted.getTime();

    const minutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
    if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return "Just now";
  };

  // Render images based on count
  const renderImages = () => {
    if (!community.postImage || community.postImage.length === 0) return null;

    const imageCount = community.postImage.length;

    console.log(typeof String(index+1))

    // Single image - full width
    if (imageCount === 1) {
      return (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={community.postImage[0]}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      );
    }

    // Multiple images - 2 per row, show first 3 and +more for 4th
    return (
      <div className="grid grid-cols-2 gap-2">
        {community.postImage.slice(0, 3).map((img, idx) => (
          <div
            key={idx}
            className={`relative h-48 rounded-lg overflow-hidden ${
              imageCount === 2 ? "" : idx === 2 ? "col-span-2" : ""
            }`}
          >
            <Image
              src={img}
              alt={`Post image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
        {imageCount > 3 && (
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src={community.postImage[3]}
              alt="Post image 4"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">
                +{imageCount - 3}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
      {/* Tags and Topics */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {community.state}
        </span>
        <span
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{ backgroundColor: "#DBEAFE", color: "#193CB8" }}
        >
          {community.topics}
        </span>
      </div>

      {/* Post Title */}
      <h3 className="text-xl font-semibold text-gray-900">
        {community.postTitle}
      </h3>

      {/* Author and Posted Time */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href={`/profile/${String(index+1)}`} className="font-medium">
          {community.authorName}
        </Link>
        <span>•</span>
        <span>{getTimeAgo(community.postedOn)}</span>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed">{community.content}</p>

      {/* Images */}
      {renderImages()}

      {/* Divider */}
      <div className="border-b border-gray-300"></div>

      {/* Likes and Comments */}
      <div className="flex items-center gap-6 text-gray-600">
        <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
          <Heart size={20} />
          <span className="text-sm font-medium">{community.likes}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
          <MessageCircle size={20} />
          <span className="text-sm font-medium">{community.comments}</span>
        </div>
      </div>
    </div>
  );
};
