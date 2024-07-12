"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Investment } from "@/types";
import dayjs from "dayjs";
import { useMemo } from "react";

const chartConfig = {
  income: {
    label: "Rendimento",
    color: "hsl(var(--chart-2))",
  },
  withdrawal: {
    label: "Retirada",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Props {
  investment: Investment;
}
export const InvestmentResultsChart = ({ investment }: Props) => {
  const chartData = useMemo(() => {
    const lastSixMonths = Array.from({ length: 6 }, (_, i) =>
      dayjs().subtract(i, "month").format("MMMM"),
    ).reverse();
    const lastSixMonthsIncomes = lastSixMonths.map((month) => {
      const income = investment.income.find(
        (inc) => dayjs(inc.createdAt).format("MMMM") === month,
      );
      return income?.value ?? 0;
    });
    const lastSixMonthsWithdrawals = lastSixMonths.map((month) => {
      const withdrawal = investment.withdrawals.find(
        (w) => dayjs(w.createdAt).format("MMMM") === month,
      );
      return withdrawal?.requestedValue ?? 0;
    });
    return lastSixMonths.map((month, index) => ({
      month,
      income: lastSixMonthsIncomes[index],
      withdrawal: lastSixMonthsWithdrawals[index],
    }));
  }, [investment.income, investment.withdrawals]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-xl"}>Resultado do investimento</CardTitle>
        <CardDescription className={"text-sm"}>
          Últimos 6 meses de rendimentos e retiradas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!chartData?.length ? (
          <div className="flex h-32 items-center justify-center text-sm text-gray-500">
            Não há dados suficientes para exibir o gráfico
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                content={<ChartTooltipContent hideLabel moneyValue={true} />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="income"
                stackId="a"
                className={"!max-w-[50px]"}
                fill="var(--color-income)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="withdrawal"
                className={"!max-w-[50px]"}
                stackId="a"
                fill="var(--color-withdrawal)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
