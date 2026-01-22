import { AdminHeading } from "@/webcomponents/reusable";
import { UploadSection } from "./UploadSection";
import { PersonalInfo } from "./PersonalInfo";
import { ChangePassword } from "./ChangePassword";

export const Profile = () => {
  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Profile"
        subheading="Manage your admin profile information and settings."
      />

      {/* Upload Section */}
      <UploadSection userName="Admin User" />

      {/* Personal Information */}
      <PersonalInfo />

      {/* Change Password */}
      <ChangePassword />
    </div>
  );
};
