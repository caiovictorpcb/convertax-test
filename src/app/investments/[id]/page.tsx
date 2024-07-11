import React from "react";
import { InvestmentContainer } from "@/components/investment-container/investment-container";

export default function InvestmentPage({ params }: { params: { id: string } }) {
  return <InvestmentContainer investmentId={params.id} />;
}
