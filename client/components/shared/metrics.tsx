"use client";

import { Card } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import {
  ArrowDown,
  ArrowUp,
  AlertTriangle,
  Users,
  CheckCircle,
  MessageCircle,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  change: string;
  icon: React.ReactNode;
  data: { value: number }[];
}

function MetricCard({ title, value, change, icon, data }: MetricCardProps) {
  const changeValue = parseFloat(change);
  const isPositive = changeValue >= 0;

  return (
    <Card className="p-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-black ">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value.toLocaleString()}</p>
            <span
              className={`flex items-center text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              {Math.abs(changeValue).toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="p-2 bg-gray-100 rounded-full dark:bg-gray-800">
          {icon}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1">
        compared to last week
      </p>
      <div className="h-[80px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

// Sample data for the sparklines
const generateSparklineData = (points: number, isPositive: boolean) =>
  Array.from({ length: points }, (_, i) => ({
    value: isPositive
      ? Math.floor(Math.random() * 100) + i
      : 100 - Math.floor(Math.random() * 100) - i,
  }));

export default function Metrics({ data }: { data: any }) {
  const metrics = [
    {
      title: "Total Posts",
      value: data.totalPosts,
      change: "66.95",
      icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
      data: generateSparklineData(20, true),
    },
    {
      title: "High Urgency",
      value: data.urgencyLevels.high,
      change: "12.05",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
      data: generateSparklineData(20, true),
    },
    {
      title: "Verified Posts",
      value: data.verifiedPosts,
      change: "4.11",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      data: generateSparklineData(20, true),
    },
    {
      title: "Resolved Cases",
      value:
        data.totalPosts - data.urgencyLevels.high - data.urgencyLevels.moderate,
      change: "27.47",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      data: generateSparklineData(20, true),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          data={metric.data}
        />
      ))}
    </div>
  );
}
