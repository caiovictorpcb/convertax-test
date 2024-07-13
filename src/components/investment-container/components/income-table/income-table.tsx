import React from "react";
import { Income } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/investment-container/components/income-table/columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  income: Income[];
}
export const IncomeTable = ({ income }: Props) => {
  return (
    <Card className="w-full max-w-none shadow">
      <CardHeader>
        <CardTitle className={"text-xl"}>Rendimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={income ?? []}
          columns={columns}
          noBorder={true}
          noResultsMessage={"Este investimento ainda não possui rendimentos"}
        />
      </CardContent>
    </Card>
  );
};
