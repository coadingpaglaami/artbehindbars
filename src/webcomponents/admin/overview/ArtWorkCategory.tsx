// ArtWorkCategory.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtworkCategoryData } from "@/types";


interface ArtworkCategoryProps {
  data?: ArtworkCategoryData;
  isLoading?: boolean;
}

export const ArtworkCategory = ({ data, isLoading = false }: ArtworkCategoryProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Artwork by Category</CardTitle>
          <CardDescription>Distribution across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[250px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Artwork by Category</CardTitle>
          <CardDescription>Distribution across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[250px] text-gray-500">
            No category data available
          </div>
        </CardContent>
      </Card>
    );
  }

  // Parse percentages to numbers
  const religiousPercent = parseFloat(data.religiousPercentage);
  const nonReligiousPercent = parseFloat(data.nonReligiousPercentage);
  
  // Create categories array for the pie chart
  const categories = [
    { name: "Religious", value: religiousPercent, count: `${religiousPercent.toFixed(1)}%` },
    { name: "Non-Religious", value: nonReligiousPercent, count: `${nonReligiousPercent.toFixed(1)}%` },
  ];

  const colors = ['#3b82f6', '#10b981']; // Blue for religious, green for non-religious
  const total = 100; // Percentages always add up to 100

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
              const startAngle = categories.slice(0, index).reduce((sum, c) => sum + c.value, 0);
              const angle = cat.value;
              const endAngle = startAngle + angle;
              
              const startRad = (startAngle * 3.6 - 90) * Math.PI / 180; // Convert percentage to degrees
              const endRad = (endAngle * 3.6 - 90) * Math.PI / 180;
              
              const x1 = 90 + 70 * Math.cos(startRad);
              const y1 = 90 + 70 * Math.sin(startRad);
              const x2 = 90 + 70 * Math.cos(endRad);
              const y2 = 90 + 70 * Math.sin(endRad);
              
              const largeArc = angle > 50 ? 1 : 0; // 50% is 180 degrees
              
              return (
                <path
                  key={cat.name}
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
            <div key={cat.name} className="flex items-center justify-between">
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