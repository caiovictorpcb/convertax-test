import React, { useMemo } from "react";
import { Investment } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoneyText } from "@/components/ui/money-text";
import dayjs from "dayjs";

interface Props {
  investment: Investment;
}
export const InvestmentDetails = ({ investment }: Props) => {
  const nextIncomeDate = useMemo(() => {
    if (investment.income.length === 0) return investment.createdAt;
    return investment.income[investment.income.length - 1].createdAt;
  }, [investment.income, investment.income.length, investment.createdAt]);

  const incomesNetValue = useMemo(
    () => investment.income.reduce((acc, income) => acc + income.value, 0),
    [investment.income],
  );
  return (
    <Card className="h-fit w-full max-w-none">
      <CardHeader>
        <CardTitle className={"text-xl"}>Detalhes do investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Saldo atual</div>
            <MoneyText
              value={investment.currentValue}
              className={"font-bold"}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">Data de criação</div>
            <div>{dayjs(investment.createdAt).format("DD/MM/YYYY")}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">
              Data do próximo rendimento:
            </div>
            <div>
              {dayjs(nextIncomeDate).add(1, "month").format("DD/MM/YYYY")}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground">
              Rendimento total acumulado
            </div>
            <MoneyText value={incomesNetValue} className={"font-bold"} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
