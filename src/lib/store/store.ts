"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import { Investment } from "@/types";
import { createInvestment } from "@/lib/store/actions/create-investment";
import { createWithdrawal } from "@/lib/store/actions/create-withdrawal";
import { CreateInvestmentDto, CreateWithdrawalDto } from "@/lib/store/types";

export interface InvestmentsStore {
  investments: Investment[];
  createInvestment: (investment: CreateInvestmentDto) => void;
  addWithdrawal: (
    investmentId: number,
    withdrawal: CreateWithdrawalDto,
  ) => void;
  deleteAllInvestments: () => void;
  deleteInvestment: (investmentId: number) => void;
}

export const useInvestmentsStore = create<InvestmentsStore>()(
  persist(
    (set, get) => ({
      investments: [],
      createInvestment: (investment: CreateInvestmentDto) => {
        set((state) => createInvestment(state, investment));
      },
      addWithdrawal: (
        investmentId: number,
        withdrawal: CreateWithdrawalDto,
      ) => {
        set((state) => createWithdrawal(state, investmentId, withdrawal));
      },
      deleteAllInvestments: () => {
        set((state) => ({
          ...state,
          investments: [],
        }));
      },
      deleteInvestment: (investmentId: number) => {
        set((state) => ({
          ...state,
          investments: state.investments.filter(
            (investment) => investment.id !== investmentId,
          ),
        }));
      },
    }),
    {
      name: "investments-storage",
    },
  ),
);

export const usePersistStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>({
    ...result,
  });

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
