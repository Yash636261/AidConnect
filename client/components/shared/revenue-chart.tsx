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

export function RevenueChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          30000, 25000, 20000, 22000, 28000, 32000, 47500, 25000, 23000, 20000,
          22000, 24000,
        ],
        backgroundColor: "rgb(99, 102, 241)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category" as const,
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
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <p className="text-sm text-muted-foreground">Avg per month</p>
        <div className="flex items-baseline space-x-2">
          <h3 className="text-2xl font-bold">$138,500</h3>
          <span className="text-sm text-green-600">13.4% ↑</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
