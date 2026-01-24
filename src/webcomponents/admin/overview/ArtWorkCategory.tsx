import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryData } from "@/interface/admin";

export const ArtworkCategory = ({ categories }: { categories: CategoryData[] }) => {
  const total = categories.reduce((sum, cat) => sum + cat.value, 0);
  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artwork by Category</CardTitle>
        <CardDescription>Distribution across all categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {categories.map((cat, index) => {
              const startAngle = categories.slice(0, index).reduce((sum, c) => sum + (c.value / total) * 360, 0);
              const angle = (cat.value / total) * 360;
              const endAngle = startAngle + angle;
              
              const startRad = (startAngle - 90) * Math.PI / 180;
              const endRad = (endAngle - 90) * Math.PI / 180;
              
              const x1 = 90 + 70 * Math.cos(startRad);
              const y1 = 90 + 70 * Math.sin(startRad);
              const x2 = 90 + 70 * Math.cos(endRad);
              const y2 = 90 + 70 * Math.sin(endRad);
              
              const largeArc = angle > 180 ? 1 : 0;
              
              return (
                <path
                  key={index}
                  d={`M 90 90 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={colors[index]}
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-3">
          {categories.map((cat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                <span className="text-sm text-gray-700">{cat.name}</span>
              </div>
              <span className="text-sm font-medium">{cat.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};