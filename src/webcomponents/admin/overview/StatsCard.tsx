import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string; // e.g., "bg-blue-500"
    title: string;
    value: string | number;
    trend: 'up' | 'down';
    trendValue: string; // e.g., "+5.4%" or "-3.2%"
}

export const StatCard = ({ icon: Icon, iconColor, title, value, trend, trendValue }: StatCardProps  ) => {
  const isPositive = trend === 'up';
  
  return (
    <Card >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className={`p-3 rounded-lg ${iconColor}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1 text-sm">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              {trendValue}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-gray-500 mt-1">{title}</div>
        </div>
      </CardContent>
    </Card>
  );
};
