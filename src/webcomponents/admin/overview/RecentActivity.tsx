import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityData } from "@/interface/admin";
import { DollarSign, Users, Image } from "lucide-react";

export const RecentActivity = ({ activities }:{ activities: ActivityData[] }) => {
  const iconMap = {
    upload: Image,
    member: Users,
    auction: DollarSign,
    registration: Users
  };

  const colorMap = {
    upload: 'bg-orange-100 text-orange-600',
    member: 'bg-purple-100 text-purple-600',
    auction: 'bg-blue-100 text-blue-600',
    registration: 'bg-green-100 text-green-600'
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            const colorClass = colorMap[activity.type];
            
            return (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{activity.title}</div>
                  <div className="text-xs text-gray-500">{activity.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};