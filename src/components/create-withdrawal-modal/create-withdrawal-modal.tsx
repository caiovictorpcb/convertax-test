import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateWithdrawalForm } from "@/components/create-withdrawal-modal/create-withdrawal-form";
import { Investment } from "@/types";
import { AddButton } from "@/components/ui/add-button";

interface Props {
  investment: Investment;
}
export const CreateWithdrawalModal = ({ investment }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <AddButton label={"Fazer retirada"} onClick={openModal} />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fazer retirada</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para retirar um valor do seu
              investimento
            </DialogDescription>
          </DialogHeader>
          <CreateWithdrawalForm onClose={onClose} investment={investment} />
        </DialogContent>
      </Dialog>
    </>
  );
};
