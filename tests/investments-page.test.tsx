import "@testing-library/jest-dom";
import InvestmentsPage from "@/app/investments/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("InvestmentsPage Components", () => {
  it("renders a heading", () => {
    render(<InvestmentsPage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toHaveTextContent("Meus investimentos");
  });

  it("renders a InvestmentsTable", () => {
    render(<InvestmentsPage />);

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();
  });
  it("renders a CreateInvestmentModal", () => {
    render(<InvestmentsPage />);

    const modal = screen.getByText("Criar investimento");

    expect(modal).toBeInTheDocument();
  });
});
