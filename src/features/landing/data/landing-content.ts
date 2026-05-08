import type {
  LandingSectionSummary,
  MatrixPreviewOption,
  ProjectRequirement,
} from "@/features/landing/types/landing.types";

export const landingContent = {
  title: "EigenScope",
  summary: "Matrix diagonalization analysis system.",
} as const;

export const landingSections: readonly LandingSectionSummary[] = [
  { id: "hero", label: "Hero" },
  { id: "project-overview", label: "Project overview" },
  { id: "features", label: "Feature outline" },
  { id: "technical-stack", label: "Technical stack" },
  { id: "cta", label: "CTA" },
] as const;

export const projectOverviewContent = {
  eyebrow: "Project Overview",
  title: "Matrix diagonalization brief, mapped into product scope.",
  description:
    "EigenScope will guide a user from a 2x2 or 3x3 matrix input toward eigenvalues, eigenvectors, and a clear diagonalization verdict.",
  matrixOptions: [
    {
      size: 2,
      label: "2x2 Matrix",
      description: "Compact input mode for the required two-dimensional case.",
    },
    {
      size: 3,
      label: "3x3 Matrix",
      description: "Expanded input mode for the required three-dimensional case.",
    },
  ] satisfies readonly MatrixPreviewOption[],
  requirements: [
    {
      id: "eigenvalues",
      order: 1,
      title: "Find eigenvalues",
      shortLabel: "Eigenvalues",
      detail: "The system must expose the scalar values that satisfy the characteristic equation.",
      acceptance: "The result area will list all eigenvalues for the selected matrix size.",
    },
    {
      id: "eigenvectors",
      order: 2,
      title: "Find eigenvectors",
      shortLabel: "Eigenvectors",
      detail: "The system must connect each eigenvalue to its corresponding vector space.",
      acceptance: "Each eigenvalue will have an eigenvector explanation or basis representation.",
    },
    {
      id: "diagonalizable-check",
      order: 3,
      title: "Check diagonalizability",
      shortLabel: "Check",
      detail: "The system must decide whether the matrix has enough independent eigenvectors.",
      acceptance: "The verdict will clearly state diagonalizable or not diagonalizable.",
    },
    {
      id: "diagonal-matrices",
      order: 4,
      title: "Find P, P^-1, and D",
      shortLabel: "P and D",
      detail: "When valid, the system must organize the diagonalization relation D = P^-1 A P.",
      acceptance: "The output will show P, P^-1, and D with the relationship preserved.",
    },
    {
      id: "non-diagonalizable-reason",
      order: 5,
      title: "Explain failure reasons",
      shortLabel: "Reason",
      detail: "When invalid, the system must explain why diagonalization is not possible.",
      acceptance: "The user receives a plain-language reason instead of a silent failure.",
    },
  ] satisfies readonly ProjectRequirement[],
  deliveryFacts: [
    "Individual project",
    "Submit through LEB2",
    "Due 29/05/69",
    "Implementation language is flexible",
  ],
} as const;
