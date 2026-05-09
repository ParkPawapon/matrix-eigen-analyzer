import type {
  LandingSectionSummary,
  MatrixPreviewOption,
  ProjectRequirement,
} from "@/features/landing/types/landing.types";

export const landingContent = {
  title: "EigenScope",
  summary: "Matrix diagonalization analysis system for 2x2 and 3x3 matrices.",
} as const;

export const landingSections: readonly LandingSectionSummary[] = [
  { id: "hero", label: "Hero" },
  { id: "calculator", label: "Calculator" },
  { id: "project-overview", label: "Project overview" },
  { id: "features", label: "Feature outline" },
  { id: "technical-stack", label: "Technical stack" },
  { id: "cta", label: "CTA" },
] as const;

export const projectOverviewContent = {
  eyebrow: "Project Overview",
  title: "A guided tour of the diagonalization workflow.",
  description:
    "EigenScope turns the assignment into a readable sequence: enter a matrix, solve the characteristic equation, inspect the eigenvectors, then decide whether a diagonal form exists.",
  matrixOptions: [
    {
      size: 2,
      label: "2x2 Matrix",
      description:
        "The compact case. Four values define A, and the characteristic equation is quadratic.",
    },
    {
      size: 3,
      label: "3x3 Matrix",
      description:
        "The expanded case. Nine values define A, and the characteristic equation is cubic.",
    },
  ] satisfies readonly MatrixPreviewOption[],
  requirements: [
    {
      id: "eigenvalues",
      order: 1,
      title: "Find eigenvalues",
      shortLabel: "Eigenvalues",
      definition:
        "Eigenvalues are the scalars that keep a vector on the same line after A is applied.",
      formula: "det(A - lambda I) = 0",
      output: "The result panel lists every root found for the selected 2x2 or 3x3 matrix.",
    },
    {
      id: "eigenvectors",
      order: 2,
      title: "Find eigenvectors",
      shortLabel: "Eigenvectors",
      definition: "Eigenvectors are non-zero vectors that only scale when multiplied by A.",
      formula: "(A - lambda I)v = 0, v != 0",
      output: "Each eigenvalue is paired with an eigenvector basis when one is available.",
    },
    {
      id: "diagonalizable-check",
      order: 3,
      title: "Check diagonalizability",
      shortLabel: "Check",
      definition:
        "A matrix is diagonalizable when it has enough independent eigenvectors to form a basis.",
      formula: "sum dim(E_lambda) = n",
      output:
        "The report states whether the matrix is diagonalizable over the real or complex field.",
    },
    {
      id: "diagonal-matrices",
      order: 4,
      title: "Find P, P^-1, and D",
      shortLabel: "P and D",
      definition:
        "P is built from independent eigenvectors, and D stores the matching eigenvalues.",
      formula: "D = P^-1 A P",
      output: "When valid, the report shows P, P^-1, and the diagonal matrix D.",
    },
    {
      id: "non-diagonalizable-reason",
      order: 5,
      title: "Explain failure reasons",
      shortLabel: "Reason",
      definition:
        "Failure is usually caused by too few independent eigenvectors for the matrix size.",
      formula: "geometric multiplicity < algebraic multiplicity",
      output: "If P cannot be formed, the report explains the missing eigenvector basis clearly.",
    },
  ] satisfies readonly ProjectRequirement[],
} as const;
