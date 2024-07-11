"use client";
import React, { useMemo } from "react";
import { useInvestments } from "@/hooks/use-investments";
import { WithdrawalsTable } from "@/components/investment-container/components/withdrawals-table/withdrawals-table";
import { CreateWithdrawalModal } from "@/components/create-withdrawal-modal/create-withdrawal-modal";
import { IncomeTable } from "@/components/investment-container/components/income-table/income-table";
import { DeleteInvestmentModal } from "@/components/delete-investment-modal/delete-investment-modal";
import { InvestmentDetails } from "@/components/investment-container/components/investment-details/investment-details";
import { InvestmentsBreadcrumb } from "@/components/investments-breadcrumb/investments-breadcrumb";

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
    <div className={"flex size-full items-center justify-center"}>
      <div className={"flex size-full flex-col gap-8"}>
        <div className={"flex w-full flex-col gap-4"}>
          <div
            className={
              "flex w-full flex-col justify-between gap-4 md:flex-row md:items-center"
            }
          >
            <InvestmentsBreadcrumb investment={investment} />
            <div className={"flex flex-row items-center gap-4"}>
              <CreateWithdrawalModal investment={investment} />
              <DeleteInvestmentModal investmentId={investment.id} />
            </div>
          </div>
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <div className={"flex w-full flex-col gap-8"}>
              <InvestmentDetails investment={investment} />
              <IncomeTable income={investment.income} />
            </div>
            <WithdrawalsTable withdrawals={investment.withdrawals} />
          </div>
        </div>
      </div>
    </div>
  );
};
