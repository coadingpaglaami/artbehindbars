// MemberEngagement.tsx
import { useGetUserEngagement } from "@/api/overview";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserEngagementData } from "@/types";
import { Loader2 } from "lucide-react";

interface MemberEngagementProps {
  data?: UserEngagementData;
  isLoading?: boolean;
}

export const MemberEngagement = ({ data, isLoading = false }: MemberEngagementProps) => {
  if (isLoading) {
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
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
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
          <div className="flex justify-center items-center h-[300px] text-gray-500">
            No engagement data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageScore = data.averageScore || 0;
  const maxScore = 100;
  
  // Format trend data for the chart
  const hasTrendData = data.engagementTrend && data.engagementTrend.length > 0;
  
  // Create path for trend line
  const createTrendPath = () => {
    if (!hasTrendData) return "M 0 80 L 400 80";
    
    const width = 400;
    const height = 80;
    const points = data.engagementTrend.map((item, index) => {
      const x = (index / (data.engagementTrend.length - 1)) * width;
      // Scale the total to fit in the chart (max height 80, with some padding)
      const maxTotal = Math.max(...data.engagementTrend.map(d => d.total), 1);
      const y = height - (item.total / maxTotal) * height * 0.8 - 10; // Leave some padding at bottom
      return { x, y };
    });
    
    if (points.length === 0) return "M 0 80 L 400 80";
    if (points.length === 1) return `M 0 ${points[0].y} L 400 ${points[0].y}`;
    
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  const trendPath = createTrendPath();

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
          <svg width="100%" height="120" viewBox="0 0 400 120" className="mb-4">
            {/* Trend line */}
            <path
              d={trendPath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
            />
            {/* Area under the curve */}
            <path
              d={`${trendPath} L 400 120 L 0 120 Z`}
              fill="url(#gradient)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* X-axis labels (days) */}
            {hasTrendData && data.engagementTrend.map((item, index) => {
              if (index % 2 === 0) { // Show every other day to avoid crowding
                const x = (index / (data.engagementTrend.length - 1)) * 400 - 20;
                const date = new Date(item.day);
                const label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return (
                  <text
                    key={index}
                    x={x}
                    y="110"
                    fontSize="8"
                    fill="#9ca3af"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                );
              }
              return null;
            })}
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-green-600">{data.active}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{data.newUsers}</div>
            <div className="text-xs text-gray-500">New</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-red-600">{data.inactive}</div>
            <div className="text-xs text-gray-500">Inactive</div>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Average Activity Score
            </span>
            <span className="text-2xl font-bold">
              {averageScore > 0 ? averageScore.toFixed(1) : 'N/A'}
            </span>
          </div>

          {averageScore > 0 && (
            <>
              <Progress
                value={averageScore}
                max={maxScore}
                className="h-3 **:data-[slot=progress-indicator]:bg-green-600"
              />
              <div className="text-xs text-gray-400 text-right">
                out of {maxScore}
              </div>
            </>
          )}
          
          {averageScore === 0 && (
            <div className="text-xs text-gray-400 text-center py-2">
              No activity score data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};