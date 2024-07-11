import { ColumnDef } from "@tanstack/react-table";
import { Income } from "@/types";
import dayjs from "dayjs";
import { MoneyText } from "@/components/ui/money-text";

export const columns: ColumnDef<Income>[] = [
  {
    id: "data",
    header: "Data do rendimento",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span>{dayjs(row.original.createdAt).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    id: "value",
    header: "Valor",
    accessorKey: "value",
    cell: ({ row }) => (
      <MoneyText value={row.original.value} fractionDigits={3} />
    ),
  },
];
