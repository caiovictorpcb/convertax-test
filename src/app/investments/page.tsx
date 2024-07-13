import { InvestmentsTable } from "@/components/investments-table/investments-table";
import { DeleteAllInvestmentsModal } from "@/components/delete-all-investments-modal/delete-all-investments-modal";
import { InvestmentsChart } from "@/components/investments-chart/investments-chart";
import { CreateInvestmentModal } from "@/components/create-investment-modal/create-investment-modal";

export default function InvestmentsPage() {
  return (
    <div className={"flex size-full items-center"}>
      <div className={"flex size-full flex-col gap-6"}>
        <div className="flex flex-col items-end justify-between gap-12 pt-8 md:flex-row lg:items-center">
          <div className={"flex flex-col gap-2"}>
            <h1 className="text-2xl font-bold">
              Olá, seja bem vindo(a) ao Dashboard de Investimentos!
            </h1>{" "}
            <span className={"text-sm text-black"}>
              Aqui você pode acompanhar e gerenciar todos os seus investimentos
              de maneira detalhada. <br />
              Crie novos investimentos para expandir seu portfólio, exclua
              aqueles que já não são mais necessários e veja os detalhes de cada
              um deles.
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:items-center">
            <CreateInvestmentModal />
            <DeleteAllInvestmentsModal />
          </div>
        </div>
        <div className={"flex flex-col gap-8 lg:flex-row"}>
          <InvestmentsTable />
          <InvestmentsChart className={"w-full shadow lg:w-2/5"} />
        </div>
      </div>
    </div>
  );
}
