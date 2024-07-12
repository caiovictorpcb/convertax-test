"use client";

import * as React from "react";
import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useInvestments } from "@/hooks/use-investments";
import { cn } from "@/lib/utils";

const chartConfig = {
  value: {
    label: "Valor",
  },
} satisfies ChartConfig;

interface Props {
  className?: string;
}
export const InvestmentsChart = ({ className }: Props) => {
  const { investments } = useInvestments();

  const chartData = useMemo(
    () =>
      investments.map((investment, index) => ({
        name: investment.name,
        value: investment.currentValue,
        fill: `hsl(var(--chart-${index + 1}))`,
      })),
    [investments],
  );
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  const hasInvestments = useMemo(() => !!investments?.length, [investments]);

  return (
    <Card
      className={cn(
        "flex h-full flex-col",
        hasInvestments && "h-fit",
        className as string,
      )}
    >
      <CardHeader>
        <CardTitle className={"text-xl"}>
          Distribuição de investimentos
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {!investments?.length ? (
          <div className="flex h-32 items-center justify-center text-sm text-gray-500 lg:h-full">
            Nenhum investimento encontrado
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[260px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel moneyValue={true} />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className={cn(
                              "fill-foreground text-xl font-bold",
                              totalValue > 10000 && "text-lg",
                            )}
                          >
                            {totalValue?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              maximumFractionDigits: 2,
                            })}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Investidos
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
