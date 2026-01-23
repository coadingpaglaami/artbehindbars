import { Switch } from "@/components/ui/switch";
interface SettingsItemProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const SettingItem = ({ title, description, checked, onCheckedChange }: SettingsItemProps) => {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-b-0">
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};