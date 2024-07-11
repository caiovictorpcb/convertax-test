"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInvestments } from "@/hooks/use-investments";
import MoneyInput from "@/components/ui/money-input";
import { DialogFooter } from "@/components/ui/dialog";
import dayjs from "dayjs";

const formSchema = z.object({
  name: z.string().min(1).max(32),
  initialValue: z.number().min(0, "Initial value must be at least 0!!!"),
  createdAt: z.date(),
});

interface CreateInvestmentDto {
  name: string;
  initialValue: number;
  createdAt: string;
}

interface Props {
  onClose: () => void;
}

export const CreateInvestmentForm = ({ onClose }: Props) => {
  const { createInvestment } = useInvestments();
  const form = useForm({
    resolver: zodResolver(
      formSchema.superRefine((data, ctx) => {
        if (data.initialValue <= 0 || !data.initialValue) {
          return ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["initialValue"],
            message: "O valor inicial deve ser maior que 0!",
          });
        }
      }),
    ),
    defaultValues: {
      name: "",
      initialValue: 0,
      createdAt: "",
    },
  });

  function onSubmit(values: CreateInvestmentDto) {
    const createdAt = dayjs(values.createdAt).toISOString();
    const name = values.name;
    const initialValue = values.initialValue;
    const investment = {
      createdAt,
      name,
      initialValue,
    };
    createInvestment(investment);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={"flex flex-row items-center gap-4"}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do investimento</FormLabel>
                <FormControl>
                  <Input placeholder="Ibovespa" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de criação</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        onClick={(e: any) => e?.stopPropagation()}
                        className={cn(
                          "w-full border pl-3 text-left font-normal",
                          !field.value ? "text-gray-500" : "text-black",
                        )}
                      >
                        {!field.value
                          ? "Selecione uma data"
                          : dayjs(field.value).format("DD/MM/YYYY")}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        <MoneyInput
          form={form}
          label="Valor inicial"
          name="initialValue"
          placeholder="R$ 0,00"
        />

        <DialogFooter>
          <Button type="submit">Criar investimento</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
