import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { InputField } from "./InputField";
import { SettingItem } from "./SettingsItem";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface GeneralSettings {
  siteName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  newUserRegistration: boolean;
  autoApproveArtwork: boolean;
}

export const GeneralConfiguration = ({ onSave }: { onSave?: (settings: GeneralSettings) => void }) => {
  const [siteName, setSiteName] = useState<string>('Nexus Art Marketplace');
  const [supportEmail, setSupportEmail] = useState<string>('support@nexusart.com');
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [newUserRegistration, setNewUserRegistration] = useState<boolean>(true);
  const [autoApproveArtwork, setAutoApproveArtwork] = useState<boolean>(false);
  const handleSave = () => {
    const settings = {
      siteName,
      supportEmail,
      maintenanceMode,
      newUserRegistration,
      autoApproveArtwork
    };
    onSave?.(settings);
    console.log('Saved settings:', settings);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <InputField
            label="Site Name"
            id="siteName"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Enter site name"
          />
          <InputField
            label="Support Email"
            id="supportEmail"
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            placeholder="Enter support email"
          />
        </div>

        <div className="space-y-0">
          <SettingItem
            title="Maintenance Mode"
            description="Disable public access to the site"
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
          />
          <SettingItem
            title="New User Registration"
            description="Allow new members to sign up"
            checked={newUserRegistration}
            onCheckedChange={setNewUserRegistration}
          />
          <SettingItem
            title="Auto-Approve Artwork"
            description="Automatically publish uploaded artwork"
            checked={autoApproveArtwork}
            onCheckedChange={setAutoApproveArtwork}
          />
        </div>

        <Button onClick={handleSave} className="">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};