import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SettingItem } from "./SettingsItem";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { useState } from "react";

type EmailNotificationsProps = {
  onSave?: (preferences: {
    newArtworkNotifications: boolean;
    auctionActivity: boolean;
    moderationAlerts: boolean;
  }) => void;
};

export const EmailNotifications = ({ onSave }: EmailNotificationsProps) => {
  const [newArtworkNotifications, setNewArtworkNotifications] = useState(true);
  const [auctionActivity, setAuctionActivity] = useState(true);
  const [moderationAlerts, setModerationAlerts] = useState(false);

  const handleSave = () => {
    const preferences = {
      newArtworkNotifications,
      auctionActivity,
      moderationAlerts,
    };
    onSave?.(preferences);
    console.log("Saved email preferences:", preferences);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-0">
          <SettingItem
            title="New Artwork Notifications"
            description="Email when new artwork is uploaded"
            checked={newArtworkNotifications}
            onCheckedChange={setNewArtworkNotifications}
          />
          <SettingItem
            title="Auction Activity"
            description="Email for new bids and auction endings"
            checked={auctionActivity}
            onCheckedChange={setAuctionActivity}
          />
          <SettingItem
            title="Moderation Alerts"
            description="Email for reported content"
            checked={moderationAlerts}
            onCheckedChange={setModerationAlerts}
          />
        </div>

        <Button onClick={handleSave} className="">
          <Save className="w-4 h-4 mr-2" />
          Save Email Preferences
        </Button>
      </CardContent>
    </Card>
  );
};
