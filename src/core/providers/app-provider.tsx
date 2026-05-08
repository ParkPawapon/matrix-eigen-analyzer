"use client";

import { ThemeProvider } from "@mui/material/styles";
import type { ReactNode } from "react";
import { muiTheme } from "@/core/theme/mui-theme";

export function AppProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}
