import type { LandingSectionSummary } from "@/features/landing/types/landing.types";

export const landingContent = {
  title: "EigenScope",
  summary: "Matrix diagonalization analysis system.",
} as const;

export const landingSections: readonly LandingSectionSummary[] = [
  { id: "hero", label: "Hero" },
  { id: "assignment-overview", label: "Project overview" },
  { id: "features", label: "Feature outline" },
  { id: "technical-stack", label: "Technical stack" },
  { id: "cta", label: "CTA" },
] as const;
