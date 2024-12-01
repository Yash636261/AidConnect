import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

interface NeedsChartProps {
  data: Record<string, number>
}

export default function NeedsChart({ data }: NeedsChartProps) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Needs</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: { label: "Count", color: "hsl(var(--chart-1))" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="var(--color-value)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

