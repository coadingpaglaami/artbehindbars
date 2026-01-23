import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueData } from "@/interface/admin";

export const RevenueTrends = ({ data }: { data: RevenueData[] }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>Monthly sales performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-4 h-64">
          {data.map((item, index) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative w-full" style={{ height: '200px' }}>
                  <div 
                    className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all hover:bg-blue-600 cursor-pointer"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      ${(item.revenue / 1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{item.month}</div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div>
            <div className="text-xs text-gray-500">Total Revenue</div>
            <div className="text-xl font-bold">${data[0].total.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Avg Sale</div>
            <div className="text-xl font-bold">${data[0].avgSale.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Total Sales</div>
            <div className="text-xl font-bold">{data[0].totalSales}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};