import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const MemberEngagement = () => {
  const averageScore = 58; // You can make this dynamic later (props or state)
  const maxScore = 100;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Member Engagement</CardTitle>
          <CardDescription>User activity metrics</CardDescription>
        </div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          ✓
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <svg width="100%" height="120" className="mb-4">
            <path
              d="M 0 80 Q 50 40, 100 60 T 200 50 T 300 70 T 400 40"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            <path
              d="M 0 80 Q 50 40, 100 60 T 200 50 T 300 70 T 400 40 L 400 120 L 0 120 Z"
              fill="url(#gradient)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">2</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold">1</div>
            <div className="text-xs text-gray-500">New</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">1</div>
            <div className="text-xs text-gray-500">Inactive</div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Average Activity Score
            </span>
            <span className="text-2xl font-bold">{averageScore}</span>
          </div>

          <Progress
            value={averageScore}
            max={maxScore}
            className="h-3 **:data-[slot=progress-indicator]:bg-green-600"
          />

          {/* Optional: small label for context */}
          <div className="text-xs text-gray-400 text-right">
            out of {maxScore}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
