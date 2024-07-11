import type { Meta, StoryObj } from "@storybook/react";

import { MoneyText } from "@/components/ui/money-text";

const meta: Meta<typeof MoneyText> = {
  component: MoneyText,
};

export default meta;
type Story = StoryObj<typeof MoneyText>;

export const Primary: Story = {
  args: {
    value: 1000.222,
    className: "font-bold",
    fractionDigits: 2,
  },
};
