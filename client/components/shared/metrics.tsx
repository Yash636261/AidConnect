import { Card, CardContent } from "@/components/ui/card";
import { LineChart, AlertTriangle, Users, Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <Card className="border-0 bg-white dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-950 shadow-md hover:shadow-lg rounded-2xl">
      <CardContent className="p-4 border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
          </div>
          <div className="flex flex-col items-end">
            {icon}
            <p
              className={cn(
                "text-sm",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {change}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Metrics({ data }: any) {
  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(2) + "%";
  };

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard
        title="Total Posts"
        value={data.totalPosts.toString()}
        change={calculateChange(data.totalPosts, data.totalPosts * 0.6)} // Assuming 60% increase
        trend="up"
        icon={<LineChart className="h-10 w-10 text-muted-foreground/50" />}
      />
      <MetricCard
        title="High Urgency"
        value={data.urgencyLevels.high.toString()}
        change={calculateChange(
          data.urgencyLevels.high,
          data.urgencyLevels.high * 0.9
        )} // Assuming 10% increase
        trend="up"
        icon={<AlertTriangle className="h-10 w-10 text-red-500/50" />}
      />
      <MetricCard
        title="Verified Posts"
        value={data.verifiedPosts.toString()}
        change={calculateChange(data.verifiedPosts, data.verifiedPosts * 0.96)} // Assuming 4% increase
        trend="up"
        icon={<Users className="h-10 w-10 text-blue-500/50" />}
      />
      <MetricCard
        title="Resolved Cases"
        value={(
          data.totalPosts -
          data.urgencyLevels.high -
          data.urgencyLevels.moderate
        ).toString()}
        change={calculateChange(
          data.totalPosts -
            data.urgencyLevels.high -
            data.urgencyLevels.moderate,
          (data.totalPosts -
            data.urgencyLevels.high -
            data.urgencyLevels.moderate) *
            0.78
        )} // Assuming 22% increase
        trend="up"
        icon={<Calendar className="h-10 w-10 text-green-500/50" />}
      />
    </div>
  );
}
