"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentAnalysisChartProps {
  sentiments: Record<string, number>;
}

export default function SentimentAnalysisChart({
  sentiments,
}: SentimentAnalysisChartProps) {
  const data = {
    labels: Object.keys(sentiments),
    datasets: [
      {
        data: Object.values(sentiments),
        backgroundColor: ["#2085ec", "#323232", "#cea9bc", "#0a417a"],
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
        <CardTitle>Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
