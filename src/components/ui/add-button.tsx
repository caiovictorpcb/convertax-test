import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  className?: string;
  onClick: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}
export const AddButton = ({
  label,
  onClick,
  className,
  variant = "default",
}: Props) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={cn("flex w-fit flex-row gap-2", className as string)}
    >
      <Plus className={"size-4"} />
      {label}
    </Button>
  );
};
