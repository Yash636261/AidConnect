import { Card, CardContent } from "@/components/ui/card";
import { LineChart } from "lucide-react";

import { cn } from "@/lib/utils";
interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <Card className="broder-0  bg-blue-50 dark:bg-neutral-900 hover:bg-blue-100 dark:hover:bg-neutral-950">
      <CardContent className="p-4 border-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
            {/* <p className="text-xs text-muted-foreground">Since last week</p> */}
          </div>
          <div className="flex flex-col items-end">
            <LineChart className="h-10 w-10 text-muted-foreground/50" />
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

export function Metrics() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <MetricCard title="Patients" value="6025" change="66.95%" trend="up" />
      <MetricCard
        title="New This Week"
        value="4152"
        change="4.11%"
        trend="up"
      />
      <MetricCard
        title="Critical Alerts"
        value="5948"
        change="62.05%"
        trend="up"
      />
      <MetricCard
        title="Appointments"
        value="5626"
        change="27.47%"
        trend="up"
      />
    </div>
  );
}
