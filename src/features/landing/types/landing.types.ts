export type LandingSectionId = "hero" | "project-overview" | "features" | "technical-stack" | "cta";

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
  detail: string;
  acceptance: string;
};

export type MatrixPreviewMode = 2 | 3;

export type MatrixPreviewOption = {
  size: MatrixPreviewMode;
  label: string;
  description: string;
};
