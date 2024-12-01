"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueChartProps {
  needs: Record<string, number>;
}

export default function RevenueChart({ needs }: RevenueChartProps) {
  const labels = Object.keys(needs);
  const values = Object.values(needs);

  const data = {
    labels,
    datasets: [
      {
        label: "Cases",
        data: values,
        backgroundColor: "hsl(var(--primary))",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          borderDash: [2],
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Cases: ${context.parsed.y}`,
        },
      },
    },
  };

  const totalCases = values.reduce((sum, value) => sum + value, 0);
  const avgCasesPerNeed = Math.round(totalCases / labels.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Needs Overview</CardTitle>
        <p className="text-sm text-muted-foreground">Avg cases per need</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold">{avgCasesPerNeed}</h3>
          <span className="text-sm text-primary">Total: {totalCases}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}

