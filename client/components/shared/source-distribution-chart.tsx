"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SourceDistributionChartProps {
  sourceCounts: Record<string, number>;
}

export default function SourceDistributionChart({
  sourceCounts
}: SourceDistributionChartProps) {
  const labels = Object.keys(sourceCounts);
  const values = Object.values(sourceCounts);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: ["#2085ec", "#cea9bc", "#72b4eb"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Source Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.keys(sourceCounts).length > 0 ? (
          <div className="h-[300px]">
            <Pie data={data} options={options} />
          </div>
        ) : (
          <p>No source data available</p>
        )}
      </CardContent>
    </Card>
  );
}
