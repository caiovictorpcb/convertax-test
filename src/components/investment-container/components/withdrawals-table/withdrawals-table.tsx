import React from "react";
import { Withdrawal } from "@/types";
import { columns } from "@/components/investment-container/components/withdrawals-table/columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  withdrawals: Withdrawal[];
}

export const WithdrawalsTable = ({ withdrawals }: Props) => {
  return (
    <Card className="h-fit w-full max-w-none shadow">
      <CardHeader>
        <CardTitle className={"text-xl"}>Retiradas</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={withdrawals ?? []}
          columns={columns}
          noBorder={true}
          noResultsMessage={"Este investimento ainda não possui retiradas"}
        />
      </CardContent>
    </Card>
  );
};
