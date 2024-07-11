import React from "react";

interface Props {
  children: React.ReactNode;
}
export default function Template({ children }: Props) {
  return (
    <div
      className={
        "flex size-full flex-col gap-8 px-8 py-24 sm:px-16 md:px-24 xl:px-32 2xl:px-48"
      }
    >
      {children}
    </div>
  );
}
