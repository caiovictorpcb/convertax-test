"use client";
import React from "react";
import { columns } from "@/components/investments-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { useInvestments } from "@/hooks/use-investments";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const InvestmentsTable = () => {
  const { investments } = useInvestments();
  const router = useRouter();
  return (
    <Card className="w-full max-w-none shadow">
      <CardHeader className={"flex w-full flex-row justify-between"}>
        <CardTitle className={"text-xl"}>Todos os investimentos</CardTitle>
      </CardHeader>
      <CardContent className={"px-0 py-4"}>
        <DataTable
          onRowClick={(row) => router.push(`/investments/${row.original.id}`)}
          data={investments ?? []}
          columns={columns}
          noBorder={true}
          noResultsMessage={"Nenhum investimento encontrado"}
        />
      </CardContent>
    </Card>
  );
};
