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

export default function RevenueChart() {
  const data = {
    labels: [
      "Food",
      "Water",
      "Shelter",
      "Medical",
      "Rescue",
      "Clothing",
      "Sanitation",
      "Communication",
      "Transportation",
      "Electricity",
      "Childcare",
      "Elderly Care",
    ],
    datasets: [
      {
        label: "Cases",
        data: [
          300, 250, 200, 220, 280, 320, 475, 250, 230, 200, 220, 240,
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
          <h3 className="text-2xl font-bold">138,500</h3>
          {/* <span className="text-sm text-green-600">13.4% ↑</span> */}
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
