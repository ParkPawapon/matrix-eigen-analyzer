import type { LandingSectionSummary } from "@/features/landing/types/landing.types";

export const landingContent = {
  title: "Assignment #2 CSS114",
  summary: "Matrix diagonalization landing page scaffold.",
} as const;

export const landingSections: readonly LandingSectionSummary[] = [
  { id: "hero", label: "Hero" },
  { id: "assignment-overview", label: "Assignment overview" },
  { id: "features", label: "Feature outline" },
  { id: "technical-stack", label: "Technical stack" },
  { id: "cta", label: "CTA" },
] as const;
