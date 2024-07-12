import { Investment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoneyText } from "@/components/ui/money-text";

export const columns: ColumnDef<Investment>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Adicionado em",
    cell: ({ row }) => (
      <span>{dayjs(row.original.createdAt).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    id: "initialValue",
    accessorKey: "initialValue",
    header: "Valor inicial",
    cell: ({ row }) => <MoneyText value={row.original.initialValue} />,
  },
  {
    id: "currentValue",
    accessorKey: "currentValue",
    header: "Valor atual",
    cell: ({ row }) => <MoneyText value={row.original.currentValue} />,
  },
];
