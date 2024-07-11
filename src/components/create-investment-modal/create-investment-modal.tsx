"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateInvestmentForm } from "@/components/create-investment-modal/create-investment-form";
import { enqueueSnackbar } from "notistack";
import { AddButton } from "@/components/ui/add-button";

export const CreateInvestmentModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    enqueueSnackbar("Investimento criado com sucesso", {
      variant: "success",
      anchorOrigin: { vertical: "top", horizontal: "center" },
    });
    setIsOpen(false);
  };
  const openModal = () => setIsOpen(true);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AddButton label={"Criar investimento"} onClick={openModal} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar investimento</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para criar um novo investimento na sua
            carteira.
          </DialogDescription>
        </DialogHeader>
        <CreateInvestmentForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};
