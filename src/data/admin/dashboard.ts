import { ActivityData, ArtistData, AuctionData, CategoryData, RevenueData, StatsData } from "@/interface/admin";
import { DollarSign, Star, Users,Image } from "lucide-react";

  export const statsData: StatsData[] = [
    { icon: Users, iconColor: 'bg-blue-500', title: 'Total Artists', value: '5', trend: 'up', trendValue: '+12.5%' },
    { icon: Image, iconColor: 'bg-purple-500', title: 'Total Artworks', value: '5', trend: 'up', trendValue: '+8.2%' },
    { icon: Star, iconColor: 'bg-orange-500', title: 'Active Auctions', value: '1', trend: 'down', trendValue: '-3.4%' },
    { icon: DollarSign, iconColor: 'bg-green-500', title: 'Total Revenue', value: '$300', trend: 'up', trendValue: '+15.3%' }
  ];

 export const revenueData:RevenueData[] = [
    { month: 'Jan', revenue: 2100, total: 20000, avgSale: 4483, totalSales: 70 },
    { month: 'Feb', revenue: 3200, total: 20000, avgSale: 4483, totalSales: 70 },
    { month: 'Mar', revenue: 2800, total: 20000, avgSale: 4483, totalSales: 70 },
    { month: 'Apr', revenue: 4100, total: 20000, avgSale: 4483, totalSales: 70 },
    { month: 'May', revenue: 3800, total: 20000, avgSale: 4483, totalSales: 70 },
    { month: 'Jun', revenue: 4200, total: 20000, avgSale: 4483, totalSales: 70 }
  ];

 export const categoryData:CategoryData[] = [
    { name: 'Painting', value: 35, count: 3 },
    { name: 'Drawing', value: 25, count: 1 },
    { name: 'Abstract', value: 20, count: 1 },
    { name: 'Sketch', value: 15, count: 1 },
    { name: 'Texture', value: 5, count: 1 }
  ];

export  const artistsData:ArtistData[] = [
    { name: 'David Wilson', artworks: 12 },
    { name: 'Emily Brown', artworks: 10 },
    { name: 'Sarah Jones', artworks: 8 },
    { name: 'John Doe', artworks: 6 },
    { name: 'Michael Smith', artworks: 3 },
    { name: 'Robert Davis', artworks: 2 }
  ];

  export const auctionData:AuctionData[] = [
    { title: 'Desert Solitude', status: 'High Bid', bid: 195 },
    { title: 'Silent Night', status: 'Active', bid: 235 },
    { title: 'Future Cityscape', status: 'Moderate', bid: 40 }
  ];

 export  const activityData:ActivityData[] = [
    { type: 'upload', title: 'Alice had uploaded art "Dream Solitude"', time: '6 minutes ago' },
    { type: 'member', title: 'New artwork uploaded by John Doe', time: '15 minutes ago' },
    { type: 'auction', title: 'Pair just received bid for Sarah Jones', time: '1 hour ago' },
    { type: 'registration', title: 'New member registration', time: '2 hours ago' }
  ];