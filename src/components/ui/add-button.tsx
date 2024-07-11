import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  label: string;
  onClick: () => void;
}
export const AddButton = ({ label, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="default"
      className={"flex w-fit flex-row gap-2 text-white"}
    >
      <Plus className={"size-4 text-white"} />
      {label}
    </Button>
  );
};
