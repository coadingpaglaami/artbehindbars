"use client";
import { AdminHeading } from "@/webcomponents/reusable";
import { GeneralConfiguration } from "./GeneralConfiguration";
import { EmailNotifications } from "./EmailNotification";

interface GeneralSettings {
  siteName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  newUserRegistration: boolean;
  autoApproveArtwork: boolean;
}

interface EmailPreferences {
  [key: string]: unknown;
}

export const Settings = () => {
  const handleGeneralSave = (settings: GeneralSettings): void => {
    // Handle save logic here - could be an API call
    alert("General settings saved successfully!");
  };

  const handleEmailSave = (preferences: EmailPreferences): void => {
    // Handle save logic here - could be an API call
    alert("Email preferences saved successfully!");
  };
  return (
    <div className="py-16 flex flex-col gap-6">
      <AdminHeading
        heading="Settings"
        subheading="Manage general site configuration and admin preferences."
      />
      <GeneralConfiguration onSave={handleGeneralSave} />
      <EmailNotifications onSave={handleEmailSave} />
    </div>
  );
};
