import { Investment, Withdrawal } from "@/types";

export interface CreateInvestmentDto
  extends Omit<Investment, "id" | "withdrawals" | "currentValue" | "income"> {}
export interface CreateWithdrawalDto
  extends Omit<
    Withdrawal,
    "id" | "previousValue" | "afterValue" | "netValue" | "tax"
  > {}
