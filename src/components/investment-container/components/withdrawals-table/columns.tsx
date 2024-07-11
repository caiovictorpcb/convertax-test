import { ColumnDef } from "@tanstack/react-table";
import { Withdrawal } from "@/types";
import dayjs from "dayjs";
import { MoneyText } from "@/components/ui/money-text";

export const columns: ColumnDef<Withdrawal>[] = [
  {
    id: "data",
    header: "Data da retirada",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <span>{dayjs(row.original.createdAt).format("DD/MM/YYYY")}</span>
    ),
  },
  {
    id: "previousValue",
    header: "Valor requisitado",
    accessorKey: "requestedValue",
    cell: ({ row }) => <MoneyText value={row.original.requestedValue} />,
  },
  {
    id: "value",
    header: "Valor retirado",
    accessorKey: "value",
    cell: ({ row }) => <MoneyText value={row.original.netValue} />,
  },
  {
    id: "tax",
    header: "Imposto pago",
    accessorKey: "tax",
    cell: ({ row }) => {
      const tax = row.original.tax * 100;
      return (
        <span>
          <MoneyText
            value={row.original.requestedValue - row.original.netValue}
          />
          &nbsp; (<span>{tax.toFixed(1).replace(".", ",") + "%"}</span>)
        </span>
      );
    },
  },
];
