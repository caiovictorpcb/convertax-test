import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function Template({ children }: Props) {
  return <div className={"pageContainer size-full pt-24"}>{children}</div>;
}
