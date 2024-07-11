import dayjs from "dayjs";
import { InvestmentsStore } from "@/lib/store/store";
import { CreateInvestmentDto } from "@/lib/store/types";

const monthlyRate = 0.0052;

export function createInvestment(
  state: InvestmentsStore,
  investment: CreateInvestmentDto,
) {
  const monthsDiff = dayjs().diff(dayjs(investment.createdAt), "months");
  let incomeList = [];
  let currentValue = investment.initialValue;

  for (let i = 0; i < monthsDiff; i++) {
    const interest = currentValue * monthlyRate;
    currentValue += interest;

    const income = {
      id: i + 1,
      value: interest,
      createdAt: dayjs(investment.createdAt)
        .add(i + 1, "month")
        .toISOString(),
      afterValue: currentValue,
    };

    incomeList.push(income);
  }

  return {
    ...state,
    investments: [
      ...(state.investments ?? []),
      {
        ...investment,
        income: incomeList,
        currentValue: currentValue,
        withdrawals: [],
        id: state?.investments?.length
          ? state.investments[state.investments.length - 1].id + 1
          : 1,
      },
    ],
  };
}
