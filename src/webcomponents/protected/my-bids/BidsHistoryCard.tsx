import { Gavel, TrendingUp, AlertTriangle, Trophy } from "lucide-react";

interface BidStatsProps {
  totalBids: number;
  winningBids: number;
  outbidBids: number;
  wonBids: number;
}

export const BidsHistoryCard = ({ stats }: { stats: BidStatsProps }) => {
  const statsConfig = [
    {
      label: "Total Bids",
      value: stats.totalBids,
      icon: <Gavel size={24} />,
      color: "#6B7280",
      bgColor: "#F3F4F6",
    },
    {
      label: "Winning",
      value: stats.winningBids,
      icon: <TrendingUp size={24} />,
      color: "#00A63E",
      bgColor: "#E8F5E9",
    },
    {
      label: "Outbid",
      value: stats.outbidBids,
      icon: <AlertTriangle size={24} />,
      color: "#F97316",
      bgColor: "#FFF7ED",
    },
    {
      label: "Won",
      value: stats.wonBids,
      icon: <Trophy size={24} />,
      color: "#1447E6",
      bgColor: "#E8F0FE",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Bid Statistics</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-4 rounded-lg"
            style={{ backgroundColor: stat.bgColor }}
          >
            <div style={{ color: stat.color }} className="mb-2">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 text-center">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};