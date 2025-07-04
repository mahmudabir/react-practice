'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';

type DashboardChartProps = {
  chartData: { name: string; beds: number }[];
  chartConfig: ChartConfig;
};

export function DashboardChart({
  chartData,
  chartConfig,
}: DashboardChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <RechartsBarChart
        data={chartData}
        margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        accessibilityLayer
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="beds" fill="hsl(var(--primary))" radius={4} />
      </RechartsBarChart>
    </ChartContainer>
  );
}
