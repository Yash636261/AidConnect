import { Card, CardContent } from "@/components/ui/card";
import { LineChart, AlertTriangle, Users, Calendar } from 'lucide-react';

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
    <Card className="border-0 bg-blue-50 dark:bg-neutral-900 hover:bg-blue-100 dark:hover:bg-neutral-950">
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

export default function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard
        title="Total Posts"
        value="6025"
        change="66.95%"
        trend="up"
        icon={<LineChart className="h-10 w-10 text-muted-foreground/50" />}
      />
      <MetricCard
        title="High Urgency"
        value="1873"
        change="12.05%"
        trend="up"
        icon={<AlertTriangle className="h-10 w-10 text-red-500/50" />}
      />
      <MetricCard
        title="Verified Posts"
        value="4152"
        change="4.11%"
        trend="up"
        icon={<Users className="h-10 w-10 text-blue-500/50" />}
      />
      <MetricCard
        title="Resolved Cases"
        value="2314"
        change="27.47%"
        trend="up"
        icon={<Calendar className="h-10 w-10 text-green-500/50" />}
      />
    </div>
  );
}

