export type LandingSectionId =
  | "hero"
  | "calculator"
  | "project-overview"
  | "features"
  | "technical-stack"
  | "cta";

export type LandingSectionSummary = {
  id: LandingSectionId;
  label: string;
};

export type ProjectRequirementId =
  | "eigenvalues"
  | "eigenvectors"
  | "diagonalizable-check"
  | "diagonal-matrices"
  | "non-diagonalizable-reason";

export type ProjectRequirement = {
  id: ProjectRequirementId;
  order: number;
  title: string;
  shortLabel: string;
  definition: string;
  formula: string;
  output: string;
};
