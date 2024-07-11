import { useInvestmentsStore, usePersistStore } from "@/lib/store/store";

export function useInvestments() {
  const {
    investments,
    createInvestment,
    addWithdrawal,
    deleteAllInvestments,
    deleteInvestment,
  } = usePersistStore(useInvestmentsStore, (state) => state);
  return {
    investments,
    createInvestment,
    addWithdrawal,
    deleteAllInvestments,
    deleteInvestment,
  };
}
