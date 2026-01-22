"use client";

import { useState } from "react";
import { Camera, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UploadSectionProps {
  userName?: string;
}

export const UploadSection = ({ userName = "Admin User" }: UploadSectionProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const getInitials = () => {
    const names = userName.split(" ");
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
    }
    return userName.charAt(0).toUpperCase();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
  };

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
          />
          <label htmlFor="profile-image-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>
                <Upload size={16} className="mr-2" />
                Upload new photo
              </span>
            </Button>
          </label>
          <Button
            variant="ghost"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 size={16} className="mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};