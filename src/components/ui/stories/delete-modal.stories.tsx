import type { Meta, StoryObj } from "@storybook/react";

import { DeleteModal } from "@/components/ui/delete-modal";

const meta: Meta<typeof DeleteModal> = {
  component: DeleteModal,
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

export const Primary: Story = {
  args: {
    label: "Deletar todos os investimentos",
    description:
      "Tem certeza que deseja deletar todos os investimentos? Esta ação é irreversível.",
    onDelete: () => {},
  },
};
