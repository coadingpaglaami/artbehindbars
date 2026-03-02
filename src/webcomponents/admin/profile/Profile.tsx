// Profile.tsx
"use client";
import { AdminHeading } from "@/webcomponents/reusable";
import { UploadSection } from "./UploadSection";
import { PersonalInfo } from "./PersonalInfo";
import { ChangePassword } from "./ChangePassword";
import { useGetMyProfile, useUpdateProfileMutation } from "@/api/account";
import { Loader2 } from "lucide-react";

export const Profile = () => {
  const { data: profileData, isLoading } = useGetMyProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfileMutation();
  if (isLoading) {
    return (
      <div className="py-16 flex flex-col gap-6">
        <AdminHeading
          heading="Profile"
          subheading="Manage your admin profile information and settings."
        />
        <div className="flex justify-center items-center min-h-100">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Profile"
        subheading="Manage your admin profile information and settings."
      />

      {/* Upload Section */}
      <UploadSection 
        profileData={profileData}
        onUpdateProfile={updateProfile}
        isUpdating={isUpdating}
      />

      {/* Personal Information */}
      <PersonalInfo 
        profileData={profileData}
        onUpdateProfile={updateProfile}
        isUpdating={isUpdating}
      />

      {/* Change Password */}
      <ChangePassword />
    </div>
  );
};