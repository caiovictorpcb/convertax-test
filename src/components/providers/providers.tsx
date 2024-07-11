"use client";
import React from "react";
import { SnackbarProvider } from "notistack";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};
