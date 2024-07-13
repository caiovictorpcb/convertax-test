import React from "react";
import { DeleteModal } from "@/components/ui/delete-modal";
import { useInvestments } from "@/hooks/use-investments";
import { useRouter } from "next/navigation";

interface Props {
  investmentId: number;
}
export const DeleteInvestmentModal = ({ investmentId }: Props) => {
  const { deleteInvestment } = useInvestments();
  const router = useRouter();
  const onDelete = () => {
    deleteInvestment(investmentId);
    router.push("/investments");
  };
  return (
    <DeleteModal
      onDelete={onDelete}
      label={"Apagar investimento"}
      description={
        "Tem certeza que deseja deletar este investimento? Esta ação é irreversível."
      }
    />
  );
};
