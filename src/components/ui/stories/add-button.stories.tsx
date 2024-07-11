import type { Meta, StoryObj } from "@storybook/react";

import { AddButton } from "@/components/ui/add-button";

const meta: Meta<typeof AddButton> = {
  component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Primary: Story = {
  args: {
    label: "Criar investimento",
    onClick: () => {},
  },
};
