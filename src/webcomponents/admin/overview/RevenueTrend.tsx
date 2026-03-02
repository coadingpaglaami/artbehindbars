// RevenueTrend.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueTrendsData } from "@/types";
import { Loader2 } from "lucide-react";

interface RevenueTrendsProps {
  data?: RevenueTrendsData;
  isLoading?: boolean;
}

export const RevenueTrends = ({ data, isLoading = false }: RevenueTrendsProps) => {
  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-64 text-gray-500">
            No revenue data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const { totalSales, totalRevenue, avgSales } = data;
  const maxRevenue = Math.max(...totalSales.map(d => d.revenue), 1);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Monthly sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4 h-64">
          {totalSales.map((item, index) => {
            const height = item.revenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full" style={{ height: '200px' }}>
                  {item.revenue > 0 ? (
                    <div 
                      className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(item.revenue / 100).toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div className="absolute bottom-0 w-full bg-gray-100 rounded-t-lg h-1" />
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            );
          })}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div>
            <div className="text-xs text-gray-500">Total Revenue</div>
            <div className="text-xl font-bold">${(totalRevenue / 100).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Avg Sale</div>
            <div className="text-xl font-bold">${(avgSales / 100).toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Sales</div>
            <div className="text-xl font-bold">
              {totalSales.filter(sale => sale.revenue > 0).length}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};