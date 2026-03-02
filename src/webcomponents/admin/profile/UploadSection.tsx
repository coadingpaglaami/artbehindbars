// UploadSection.tsx
"use client";

import { useState, useEffect } from "react";
import { Camera, Upload, Trash2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { AccountProfile, UpdateProfileDto } from "@/types/account.type";

interface UploadSectionProps {
  profileData?: AccountProfile;
  onUpdateProfile: (data: { payload: UpdateProfileDto; image?: File | null }) => void;
  isUpdating?: boolean;
}

export const UploadSection = ({
  profileData,
  onUpdateProfile,
  isUpdating = false,
}: UploadSectionProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [originalAvatar, setOriginalAvatar] = useState<string | null>(null);
  const [pendingRemove, setPendingRemove] = useState(false);

  // Set initial image from profile data
  useEffect(() => {
    if (profileData?.avatar || profileData?.profilePictureUrl) {
      const avatarUrl = profileData.avatar || profileData.profilePictureUrl || null;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfileImage(avatarUrl);
      setOriginalAvatar(avatarUrl);
    }
  }, [profileData]);

  const getInitials = () => {
    if (profileData?.firstName && profileData?.lastName) {
      return `${profileData.firstName.charAt(0)}${profileData.lastName.charAt(0)}`.toUpperCase();
    }
    if (profileData?.firstName) {
      return profileData.firstName.charAt(0).toUpperCase();
    }
    return "A";
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setProfileImageFile(file);
      setPendingRemove(false);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setProfileImage(null);
    setProfileImageFile(null);
    setPendingRemove(true);
  };

  const handleSave = () => {
    if (pendingRemove) {
      onUpdateProfile({ payload: { avatar: null }, image: null });
    } else {
      onUpdateProfile({
        payload: {},
        image: profileImageFile || undefined,
      });
    }
  };

  const hasChanges = profileImageFile !== null || pendingRemove;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Profile Picture</h2>
        <p className="text-sm text-gray-500 mt-1">
          Upload a professional photo for your admin profile
        </p>
      </div>

      <div className="flex items-center gap-6">
        {/* Image Preview */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-gray-600">
                {getInitials()}
              </span>
            )}
          </div>
          <div className="absolute bottom-0 left-0 bg-white rounded-full p-2 shadow-md">
            <Camera size={16} className="text-gray-900" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profile-image-upload"
            disabled={isUpdating}
            onClick={(e) => ((e.target as HTMLInputElement).value = "")}
          />
          <label htmlFor="profile-image-upload">
            <Button
              variant="outline"
              className="cursor-pointer"
              asChild
              disabled={isUpdating}
            >
              <span>
                <Upload size={16} className="mr-2" />
                Upload new photo
              </span>
            </Button>
          </label>

          {profileImage && !pendingRemove && (
            <Button
              variant="ghost"
              onClick={handleRemove}
              disabled={isUpdating}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-2" />
              Remove
            </Button>
          )}

          {hasChanges && (
            <Button
              onClick={handleSave}
              disabled={isUpdating}
              className="bg-gray-900 text-white hover:bg-gray-700"
            >
              {isUpdating ? (
                <Loader2 size={16} className="mr-2 animate-spin" />
              ) : (
                <Save size={16} className="mr-2" />
              )}
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};