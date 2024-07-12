"use client";
import React, { useMemo } from "react";
import { useInvestments } from "@/hooks/use-investments";
import { WithdrawalsTable } from "@/components/investment-container/components/withdrawals-table/withdrawals-table";
import { CreateWithdrawalModal } from "@/components/create-withdrawal-modal/create-withdrawal-modal";
import { IncomeTable } from "@/components/investment-container/components/income-table/income-table";
import { DeleteInvestmentModal } from "@/components/delete-investment-modal/delete-investment-modal";
import { InvestmentDetails } from "@/components/investment-container/components/investment-details/investment-details";
import { InvestmentsBreadcrumb } from "@/components/investments-breadcrumb/investments-breadcrumb";
import { InvestmentResultsChart } from "@/components/investment-container/components/investment-results-chart/investment-results-chart";

interface Props {
  investmentId: string;
}
export const InvestmentContainer = ({ investmentId }: Props) => {
  const { investments } = useInvestments();
  const investment = useMemo(
    () => investments.find((investment) => investment.id === +investmentId),
    [investments, investmentId],
  );

  if (!investment) return null;
  return (
    <div className={"flex size-full"}>
      <div className={"flex size-full flex-col gap-8"}>
        <div className={"flex size-full flex-col gap-4"}>
          <div
            className={
              "flex w-full flex-row items-end justify-between gap-4 md:items-center"
            }
          >
            <InvestmentsBreadcrumb investment={investment} />
            <div
              className={
                "flex flex-col items-start gap-4 lg:flex-row lg:items-center"
              }
            >
              <CreateWithdrawalModal investment={investment} />
              <DeleteInvestmentModal investmentId={investment.id} />
            </div>
          </div>
          <div className="flex size-full flex-col gap-8 lg:flex-row">
            <div className={"flex size-full flex-col gap-8"}>
              <InvestmentDetails investment={investment} />
              <IncomeTable income={investment.income} />
            </div>
            <div className={"flex size-full flex-col gap-8"}>
              <WithdrawalsTable withdrawals={investment.withdrawals} />
              <InvestmentResultsChart investment={investment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
