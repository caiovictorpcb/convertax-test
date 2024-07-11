import { InvestmentsStore } from "@/lib/store/store";
import { CreateWithdrawalDto } from "@/lib/store/types";
import { Withdrawal } from "@/types";
import dayjs from "dayjs";

export function createWithdrawal(
  state: InvestmentsStore,
  investmentId: number,
  createWithdrawalDto: CreateWithdrawalDto,
) {
  const investment = state?.investments?.find(
    (investment) => investment.id === investmentId,
  );

  if (!investment) {
    return state;
  }

  const investmentCurrentValueAfterWithdrawal =
    investment.currentValue - createWithdrawalDto.requestedValue;
  let tax;
  const investmentAge = dayjs().diff(dayjs(investment.createdAt), "years");
  if (investmentAge < 1) {
    tax = 0.225; // 22,5%
  } else if (investmentAge >= 1 && investmentAge < 2) {
    tax = 0.185; // 18,5%
  } else {
    tax = 0.15; // 15%
  }
  const netValue = createWithdrawalDto.requestedValue * (1 - tax);
  const withdrawal: Withdrawal = {
    ...createWithdrawalDto,
    previousValue: investment.currentValue,
    afterValue: investmentCurrentValueAfterWithdrawal,
    netValue,
    id: investment.withdrawals?.length
      ? investment.withdrawals[investment.withdrawals.length - 1].id + 1
      : 1,
    tax,
  };

  investment.currentValue = investmentCurrentValueAfterWithdrawal;
  return {
    ...state,
    investments: state.investments?.map((investment) =>
      investment.id === investmentId
        ? {
            ...investment,
            withdrawals: [...(investment.withdrawals ?? []), withdrawal],
          }
        : investment,
    ),
  };
}
