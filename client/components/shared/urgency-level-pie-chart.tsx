"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface UrgencyLevelPieChartProps {
  urgencyLevels: Record<string, number>;
}

export default function UrgencyLevelPieChart({
  urgencyLevels,
}: UrgencyLevelPieChartProps) {
  const data = {
    labels: Object.keys(urgencyLevels),
    datasets: [
      {
        data: Object.values(urgencyLevels),
        backgroundColor: ["#003F5C", "#58508D", "#FF6361"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Urgency Levels</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
