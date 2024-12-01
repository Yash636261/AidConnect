import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SourceDistributionChartProps {
  sources: Record<string, number>;
}

export default function SourceDistributionChart({
  sources,
}: SourceDistributionChartProps) {
  const labels = sources ? Object.keys(sources) : [];
  const values = sources ? Object.values(sources) : [];

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
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Source Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        {sources ? (
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
