"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface Props {
  onDelete: () => void;
  label: string | React.ReactNode;
  description: string;
  tooltip?: boolean;
}
export const DeleteModal = ({
  onDelete,
  label,
  description,
  tooltip,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };
  const onConfirm = () => {
    onDelete();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className={"flex w-fit flex-row gap-2 self-end text-white"}
        >
          <Trash className={"size-4 text-white"} />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirm}>
            Sim, deletar!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
