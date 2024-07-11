import { InvestmentsTable } from "@/components/investments-table/investments-table";
import { CreateInvestmentModal } from "@/components/create-investment-modal/create-investment-modal";
import { DeleteAllInvestmentsModal } from "@/components/delete-all-investments-modal/delete-all-investments-modal";

export default async function Home() {
  return (
    <div className={"flex size-full items-center"}>
      <div className={"flex size-full flex-col gap-4"}>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Meus investimentos</h1>
          <div className="flex items-center space-x-2">
            <CreateInvestmentModal />
            <DeleteAllInvestmentsModal />
          </div>
        </div>

        <InvestmentsTable />
      </div>
    </div>
  );
}
