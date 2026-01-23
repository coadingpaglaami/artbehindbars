import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuctionData } from "@/interface/admin";

export const AuctionPerformance = ({ auctions }: { auctions: AuctionData[] }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Auction Performance</CardTitle>
          <CardDescription>Recent auction results</CardDescription>
        </div>
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">🏆</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-gray-500 mt-1">Active</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-gray-500 mt-1">Upcoming</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold">1</div>
            <div className="text-xs text-gray-500 mt-1">Closed</div>
          </div>
        </div>
        
        <div className="flex gap-2 mb-4">
          <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600">Active</Button>
          <Button size="sm" variant="outline" className="flex-1">Upcoming</Button>
          <Button size="sm" variant="outline" className="flex-1">Closed</Button>
        </div>

        <div className="space-y-3">
          {auctions.map((auction, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{auction.title}</span>
                <Badge variant={auction.status === 'High Bid' ? 'default' : 'secondary'} className="text-xs">
                  {auction.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Current Bid</span>
                <span className="text-sm font-bold text-green-600">${auction.bid}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t">
          <div>
            <div className="text-xs text-gray-500">Total Bid Value</div>
            <div className="text-lg font-bold">$470</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Avg Bid Value</div>
            <div className="text-lg font-bold">$235</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};