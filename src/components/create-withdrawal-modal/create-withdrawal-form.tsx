"use client";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { useInvestments } from "@/hooks/use-investments";
import MoneyInput from "@/components/ui/money-input";
import { DialogFooter } from "@/components/ui/dialog";
import dayjs from "dayjs";
import { Investment } from "@/types";
import { useMemo } from "react";

const formSchema = z.object({
  value: z.number().min(0, "Initial value must be at least 0!!!"),
});

interface Props {
  onClose: () => void;
  investment: Investment;
}

export const CreateWithdrawalForm = ({ onClose, investment }: Props) => {
  const { addWithdrawal } = useInvestments();
  const form = useForm({
    resolver: zodResolver(
      formSchema.superRefine((data, ctx) => {
        if (data.value > investment.currentValue) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["value"],
            message: `O valor da retirada não pode ser maior que o valor atual do investimento`,
          });
        }
      }),
    ),
    defaultValues: {
      value: 0,
    },
  });
  const currentValue = form.watch("value");
  const tax = useMemo(() => {
    const investmentAge = dayjs().diff(dayjs(investment.createdAt), "years");
    console.log({ investmentAge });
    if (investmentAge < 1) {
      return 0.225;
    } else if (investmentAge >= 1 && investmentAge < 2) {
      return 0.185;
    } else {
      return 0.15;
    }
  }, [investment]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const createdAt = dayjs().toISOString();
    const withdrawal = {
      createdAt,
      requestedValue: values.value,
    };
    addWithdrawal(investment.id, withdrawal);
    onClose();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <MoneyInput
          form={form}
          label="Valor da retirada"
          name="value"
          placeholder="R$ 0,00"
        />
        <div className="flex flex-col gap-2">
          <span className={"text-sm"}>
            Taxa de imposto:{" "}
            <span className={"font-bold"}>
              {tax.toLocaleString("pt-BR", {
                style: "percent",
                maximumFractionDigits: 2,
              })}
            </span>
          </span>
          <span className={"text-sm"}>
            Você receberá:{" "}
            <span className={"font-bold"}>
              {(currentValue - currentValue * tax).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </span>
        </div>

        <DialogFooter>
          <Button type="submit">Fazer retirada</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
