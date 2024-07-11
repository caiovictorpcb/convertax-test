"use client";
import React from "react";
import { columns } from "@/components/investments-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { useInvestments } from "@/hooks/use-investments";
import { useRouter } from "next/navigation";

export const InvestmentsTable = () => {
  const { investments } = useInvestments();
  const router = useRouter();
  return (
    <DataTable
      onRowClick={(row) => router.push(`/investments/${row.original.id}`)}
      data={investments ?? []}
      columns={columns}
      noResultsMessage={"Nenhum investimento encontrado"}
    />
  );
};
