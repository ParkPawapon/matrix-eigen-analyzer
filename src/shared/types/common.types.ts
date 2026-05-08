import type { ReactNode } from "react";

export type WithChildren = {
  children: ReactNode;
};

export type NavigationItem = {
  href: string;
  label: string;
};
