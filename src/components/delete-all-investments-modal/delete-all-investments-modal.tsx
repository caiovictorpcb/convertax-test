"use client";
import React, { useMemo } from "react";
import { useInvestments } from "@/hooks/use-investments";
import { DeleteModal } from "@/components/ui/delete-modal";

export const DeleteAllInvestmentsModal = () => {
  const { deleteAllInvestments, investments } = useInvestments();

  const hasInvestments = useMemo(() => !!investments.length, [investments]);
  if (!hasInvestments) return null;
  return (
    <DeleteModal
      onDelete={deleteAllInvestments}
      label={"Deletar todos os investimentos"}
      description={
        "Tem certeza que deseja deletar todos os investimentos? Esta ação é irreversível."
      }
    />
  );
};
